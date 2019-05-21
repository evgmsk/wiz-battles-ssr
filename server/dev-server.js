const open = require("open");
const path = require("path");
const express = require('express');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const parser = require('body-parser');
const favicon = require('serve-favicon');

const { SC, dbConnect } = require('../config/server-conf');
const paths = require('../config/paths');
const config = require('../webpack.config');
const freePort = require('./free-port');
const serverStore = require('./middleware/createAndAttachStore');
const verify = require('./middleware/verifyAndAttachUser');
const userRouter = require('./routes/user-firebase');

const mode = process.env.NODE_ENV; 

const compiler = webpack(config);
const app = express();

const index = mode === 'devCR';

app.use(devMiddleware(compiler, {
    stats: 'minimal',
    publicPath: paths.publicPath,
    serverSideRender: !index,
    index,
}));

app.use(hotMiddleware(compiler, {
    path: '/__webpack_hmr'
}));

app.use(parser.json());
app.use((req, res, next) => {
    console.log('logger', req.url, req.body, req.method, req.query);
    return next();
});

app.use(serverStore);
app.use(verify);

app.use(parser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(userRouter);

if (!index) {
    const start = require('./routes/home');
    const game = require('./routes/game');
    app.use(favicon(path.resolve(__dirname, '../shared/assets/favicon.ico')));
    app.use(express.static(path.resolve(__dirname, "../wiz-battles")));
    app.use(game);
    app.use(start);
}



// Wrap for the 'App.listen' which takes unused port from 'freePort'
const listen = (port) => {
    app.listen(port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        const url = `${SC.protocol}${SC.host}:${port}`;
        if (index)
            open(url);
        console.log(`Listening at ${url}`);
    });
};

freePort(SC.port).then(listen, err => console.log(err));
