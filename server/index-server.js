import open from 'open';
import path from "path";
import express from 'express';
import parser from 'body-parser';
import favicon from 'serve-favicon';

import { SC, dbConnect } from '../config/server-conf';
import paths from '../config/paths';

import freePort from './free-port'; // helper function to find unused port

import userRouter from './routes/users-firebase';

const mode = process.env.NODE_ENV;

const dist = mode === 'prodSSR' ? paths.prodPath : paths.prodPathCR;
const faviconPath = mode === 'prodSSR'
    ? paths.prodPath + '/assets/images/favicon.ico'
    : paths.prodPathCR + '/favicon.ico';

const app = express();

console.log('mode', mode);

app.use((req, res, next) => {
    console.log('logger', 'url: ', req.url, 'body: ', req.body, 'method: ', req.method, 'query: ', req.query, 'params: ', req.params);
    return next();
});

app.use(parser.json());

app.use(parser.urlencoded({ extended: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.resolve(__dirname, dist)));

if (mode === 'prodSSR') {
    const start = require('./routes/home');
    const game = require('./routes/game');
    app.use(favicon(path.resolve(__dirname, faviconPath)));
    app.use(game);
    app.use(start);
}

app.use(userRouter);

// Wrap for the 'App.listen' which takes unused port from 'freePort'
const listen = (port) => {
    app.listen(port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        const url = `${SC.protocol}${SC.host}:${port}`;
        open(url);
        console.log(`Listening at ${url}`);
    });
};

// listen(4000);
freePort(SC.port).then(listen, err => console.log(err));
