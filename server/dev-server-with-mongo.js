// import fs from 'fs';
import opn from 'opn';
import config from 'config';
import path from "path";
import express from 'express';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import favicon from 'serve-favicon';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import LocalStrategy from 'passport-local';

import { SC, dbConnect } from '../config/server-conf';
import paths from '../config/paths';
import Config from '../webpack.config';
import freePort from './free-port'; // helper function to find unused port
import User from './mongoose-models/user';


const serverConfig = config.get('server');
const dbConfig = config.get('db');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useCreateIndex: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('Connected correctly to server');
});

//const shapes = JSON.parse(data);

const mode = process.env.NODE_ENV;
// console.log(User);
global.React = React;
const compiler = webpack(Config);
const app = express();



const index = mode === 'client';

app.use(devMiddleware(compiler, {
    stats: 'minimal',
    publicPath: paths.publicPath,
    serverSideRender: !index,
    index,
}));

app.use(hotMiddleware(compiler));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

if (!index) {
    app.use(favicon(path.resolve(__dirname, '../assets/favicon.ico')));
    app.use(express.static(path.resolve(__dirname, "../wiz-battles")));
    app.get('/game', (req, res) => {
        console.log('game', req.header() );
        const jsx = ( <GameUI /> );
        const reactDom = renderToString(jsx);
        res.send(makeHtmlTemplate(reactDom, ["./css/game.css"], ["./js/game.js"], "wiz-battle-game"));
    });
    app.get("/*", (req, res) => {
        const jsx = (
            <StaticRouter context={ {} } location={ req.url }>
                <StartPage />
            </StaticRouter>
        );
        const reactDom = renderToString( jsx );
        res.send(makeHtmlTemplate(reactDom));
    });
    app.post('/register', (req, res) => {
        const userData = {...req.body};
        const user = new User(userData);
        //console.log(req.body, user);
        user.save().then(user => {
             console.log('user', user);
            res.status = 200;
            res.send();
        }).catch(err => err);
        bcrypt.hash(userData.password, 10, function(err, hash) {
            userData.password = hash;
        });/**/


    });
    app.post('/login', (req, res) => {
        console.log('body', req.body);
        res.status = 200;
        res.send();
    })
}

// Wrap for the 'App.listen' which takes unused port from 'freePort'
const listen = (port) =>
    app.listen(port, (err) => {
        if (err) {
            console.log(err);
            return;
        }
        const url = `${SC.protocol}${SC.host}:${port}`;
        if (index)
            opn(url);
        console.log(`Listening at ${url}`);
    });


freePort(SC.port).then(listen, err => console.log(err));
