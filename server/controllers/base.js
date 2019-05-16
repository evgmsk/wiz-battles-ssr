import { renderToString } from "react-dom/server";
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import React from "react";
import ignoreStyles from 'ignore-styles';
import {Provider} from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
// console.log(ChunkExtractor);

import {verifyUser, Jwt} from '../jwt';
import {expires} from '../../shared/common/helper-functions';
import {usersRef} from '../firebase/firebase';
import paths from '../../config/paths';
import storeFactory from '../../shared/store';
import {initialStateStart, initialStateGame} from '../../shared/store/initialState';
import template from '../htmlTemplate';
import StartPage from '../../shared/start/start-page';

const GameUI = require('../../shared/game/gameUI/gameUI');

global.React = React;

exports.game = (req, res) => {
    const User = verifyUser(req);
    console.log('user', User);
    if (!User) {
        return
    }
    // const statsFile = path.resolve(`../${paths.prodPath}/loadable-stats.json`);
    // const extractor = new ChunkExtractor({ statsFile });
    const userRef = usersRef.doc(User.user.email);
    userRef.get().then(doc => {
        if (!doc.exists) {
            throw new Error(`User with ${User.user.email} was not found`)
        }
        const userData = doc.data();
        const {game, gameData, user: {name}} = userData;
        const expireIn = expire();
        user.set({...userData, refreshToken, expireIn});
        const token = Jwt.sign(User);
        const initialState = {game: {...game, name, token}, gameData}
        const store = storeFactory(null, initialState);
        const redux_state = store.getState();
        console.log('game');
        const jsx = ( <Provider store={store}><div>Game</div> </Provider> );
       // const scriptTags = extractor.getScriptTags();
        const reactDom = renderToString(jsx);
        const Html = template(reactDom, redux_state, ["./css/game.css"], ["./js/game.js"], "wiz-battle-game");
        res.send(Html);
    })
    
};

exports.start = (req, res) => {
    const store = storeFactory(null, initialStateStart());
    const redux_state = store.getState();
    console.log('start');
    const jsx = (
    <Provider store={store}>
        <StaticRouter context={ {} } location={ req.url }>
            <StartPage />
        </StaticRouter>
    </Provider>

    );
    const reactDom = renderToString( jsx );
    res.send(template(reactDom, redux_state ));
};
