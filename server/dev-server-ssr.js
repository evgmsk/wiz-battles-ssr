/**
 * project new-wiz-bat
 */
import open from "open";
import path from "path";
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import parser from 'body-parser';
import favicon from 'serve-favicon';

import { SC, dbConnect }from '../config/server-conf';
import paths from '../config/paths';
import config from '../webpack.config';
import freePort from './free-port'; // helper function to find unused port
import start from './routes/home';
import game from './routes/game';
import userRouter from './routes/users-firebase';

//console.log(data)
//const shapes = JSON.parse(data);
// global.React = React;
const mode = process.env.NODE_ENV;
console.log(mode ,'mode');

const compiler = webpack(config);
const app = express();


app.use((req, res, next) => {
    console.log('logger', req.url, req.body, req.method, req.query, req.params);
    return next();
});

const index = false;

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

app.use(parser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(favicon(path.resolve(__dirname, '../shared/assets/favicon.ico')));
app.use(express.static(path.resolve(__dirname, "../wiz-battles")));
app.use(game);
app.use(start);

app.use(userRouter);

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
