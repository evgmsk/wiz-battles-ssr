/**
 * project new-wiz-bat
 */
import { renderToString } from "react-dom/server";
import path from 'path';
import { StaticRouter } from 'react-router-dom';
import React from "react";
import ignoreStyles from 'ignore-styles';
import {Provider} from 'react-redux';
import { ChunkExtractor } from '@loadable/server';
console.log(ChunkExtractor);

import paths from '../../config/paths';
import storeFactory from '../../shared/store';
import {initialStateStart, initialStateGame} from '../../shared/store/initialState';
import template from '../htmlTemplate';
import StartPage from '../../shared/start/start-page';

const GameUI = require('../../shared/game/gameUI/gameUI');

global.React = React;

exports.game = (req, res) => {
    const statsFile = path.resolve(`../${paths.prodPath}/loadable-stats.json`);
    const extractor = new ChunkExtractor({ statsFile });
    const store = storeFactory(null, initialStateGame());
    const redux_state = store.getState();
    console.log('game');
    const jsx = ( <Provider store={store}><GameUI /></Provider> );
    const scriptTags = extractor.getScriptTags();
    const reactDom = renderToString(extractor.collectChunks(jsx));
    res.send(template(reactDom, redux_state, ["./css/game.css"], ["./js/game.js"], "wiz-battle-game"));
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
