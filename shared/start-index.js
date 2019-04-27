/**
 * project new-wiz-bat
 */

import React from 'react';
import  ReactDom, { hydrate, render } from 'react-dom';
import { BrowserRouter }  from 'react-router-dom'
import 'typeface-roboto';
import {Provider} from 'react-redux';
import {authenticateUser} from './store/actions/appActions'

// import './GameFunctions/TaskGenerators/langaugeTaskGenerator';
/*import { onSaveMonster } from '../src/actions/actions/gameDataActions';
 import Monsters from './data/monsters.json';*/

import storeFactory from './store/index';
import {initialStateStart} from './store/initialState';
import './assets/favicon.ico'

import '../shared/scss/reset.scss';

const { default: StartPage } = SSR ? require('./start/start-page') : require('./start/start-page-cr');

const initialState = SSR ? window.REDUX_DATA : initialStateStart();


const store = storeFactory(window, initialState);

window.REDUX_DATA = null;

store.dispatch(authenticateUser());

const target = document.getElementById('root');

const SSR = process.env.SSR;

const renderMethod = (SSR && !module.hot) ? hydrate : render;
renderMethod(
    <Provider store={store}>
        <BrowserRouter>
            <StartPage />
        </BrowserRouter>
    </Provider>
    , target);
