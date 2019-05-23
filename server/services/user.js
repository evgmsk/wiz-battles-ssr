import { renderToString } from "react-dom/server";
// import { StaticRouter } from 'react-router-dom';
import React from "react";
import ignoreStyles from 'ignore-styles';
import {Provider} from 'react-redux';
// import { ChunkExtractor } from '@loadable/server';
import uuid from 'uuid';

import {Jwt} from '../jwt';
import storeFactory from '../../shared/store';
import template from '../htmlTemplate';
import {expire} from '../../shared/common/helper-functions';

export function createPage(store, Page, res, extractor) {
    const redux_state = store.getState();
    const jsx = <Provider store={store}><Page/></Provider>;
    // const scriptTags = extractor.getScriptTags();
    const reactDom = renderToString(jsx);
    const Html = template(reactDom, redux_state, ["./css/game.css"], ["./js/game.js"], "Wiz battles game");
    res.send(Html);
}

export function updateAndSend(userRef, tokenPayload, res) {
    const refreshToken = uuid();
    const expiration = expire();
    userRef.update({refreshToken, expiration});
    if (res && tokenPayload) {
        const token = Jwt.sign(tokenPayload);
        res.json({userName: tokenPayload.name, lang: tokenPayload.lang, token, refreshToken})
    }
        
}
