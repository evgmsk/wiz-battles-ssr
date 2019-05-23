import React from 'react';
import  ReactDom, { hydrate, render } from 'react-dom';
import 'typeface-roboto';
import {Provider} from 'react-redux';

import storeFactory from './store/index';
import {initialStateGame} from './store/initialState';
import './assets/favicon.ico'

import '../shared/assets/scss/reset.scss';

const SSR = process.env.SSR;

import GamePage from './game/game-page';

const initialState = SSR ? window.REDUX_DATA : initialStateGame();
console.log(window.REDUX_DATA)

const store = storeFactory(window, initialState);

window.REDUX_DATA = null;

// store.dispatch(authenticateUser());

const target = document.getElementById('root');

const renderMethod = (SSR && !module.hot) ? hydrate : render;
renderMethod(
    <Provider store={store}>
            <GamePage />
    </Provider>
    , target);