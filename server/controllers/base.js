import { renderToString } from "react-dom/server";
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import React from "react";
import ignoreStyles from 'ignore-styles';
import {Provider} from 'react-redux';
// rsimport { ChunkExtractor } from '@loadable/server';
import uuid from 'uuid';
// console.log(ChunkExtractor);

import {verifyUser, Jwt} from '../jwt';
// import {expire} from '../../shared/common/helper-functions';
import {usersRef} from '../firebase/firebase';
import {initialStateStart, initialStateGame} from '../../shared/store/initialState'
import {createPage, updateAndSend} from '../services/user';
import storeFactory from '../../shared/store';
import template from '../htmlTemplate';
import StartPage from '../../shared/start/start-page';
import {updateUser} from '../../shared/store/actions/userActions';
import {updateGame} from '../../shared/store/actions/gameActions';
import {updateHero} from '../../shared/store/actions/heroActions';

const GameUI = require('../../shared/game/gameUI/gameUI');

global.React = React;

exports.game = (req, res) => {
    const User = verifyUser(req);
    console.log('game','user', User);
    if (!User) {
        createPage(req, res);
    } else {
        const {lang, name, email} = User;
        const tokenPayload = {name, email, lang};
        // const statsFile = path.resolve(`../${paths.prodPath}/loadable-stats.json`);
        // const extractor = new ChunkExtractor({ statsFile });
        const userRef = usersRef.doc(email);
        updateAndSend(userRef);
        userRef.get().then(doc => {
            if (!doc.exists) {
                throw new Error(`User with ${email} was not found`)
            }
            const {game, hero} = doc.data();
            req.store.dispatch(updateGame(game));
            req.store.dispatch(updateHero(hero));
            const token = Jwt.sign(tokenPayload);
            let {user} = initialStateStart();
            user = {...user, token, lang: tokenPayload.lang, userName: tokenPayload.name};
            console.log(user);
            req.store.dispatch(updateUser(user));
            createPage(req, res);
        }).catch(e => {
            console.log(e);
        })
    } 
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
