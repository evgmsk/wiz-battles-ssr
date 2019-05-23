import { renderToString } from "react-dom/server";
//import path from 'path';
import { StaticRouter } from 'react-router-dom';
import React from "react";
import ignoreStyles from 'ignore-styles';
import {Provider} from 'react-redux';
// simport { ChunkExtractor } from '@loadable/server';
import uuid from 'uuid';
// console.log(ChunkExtractor);

import {verifyUser, Jwt} from '../jwt';
// import {expire} from '../../shared/common/helper-functions';
//import {usersRef} from '../firebase/firebase';
import {initialStateStart, initialStateGame} from '../../shared/store/initialState'
import {createPage, updateAndSend} from '../services/user';
import storeFactory from '../../shared/store';
import template from '../htmlTemplate';
import StartPage from '../../shared/start/start-page';
import {updateUser} from '../../shared/store/actions/userActions';
import {updateGame} from '../../shared/store/actions/gameActions';
import {updateHero} from '../../shared/store/actions/heroActions';
import GameUI from '../../shared/game/game-page';

global.React = React;

exports.game = (req, res) => {
    const {user, userRef, store} = req;
    console.log('game', user);
    if (!user) {
        createPage(store, GameUI, res);
    } else {
        const {lang, name, email} = user;
        // const statsFile = path.resolve(`../${paths.prodPath}/loadable-stats.json`);
        // const extractor = new ChunkExtractor({ statsFile });
        updateAndSend(userRef);
        userRef.get().then(doc => {
            if (!doc.exists) {
                throw new Error(`User with ${email} was not found`)
            }
            const {game, hero} = doc.data();
            store.dispatch(updateGame(game));
            store.dispatch(updateHero(hero));
            const token = Jwt.sign({name, email, lang});
            let {user} = initialStateStart();
            user = {...user, token, lang, userName: name};
            store.dispatch(updateUser(user));
            createPage(store, GameUI, res);
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
