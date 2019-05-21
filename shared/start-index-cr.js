import React from 'react';
import  ReactDom, { render } from 'react-dom';
import { BrowserRouter }  from 'react-router-dom'
import 'typeface-roboto';
import {Provider} from 'react-redux';

import Test from './start/login/testLogin'
import StartPage from './start/start-page-cr'
import storeFactory from './store/index';
import {initialStateStart} from './store/initialState';
import {authenticateUser, checkSavedImages} from './store/actions/userActions';

import './assets/favicon.ico'

import '../shared/scss/reset.scss';

const store = storeFactory(window, initialStateStart());
store.dispatch(authenticateUser());

const storage = JSON.parse(localStorage.getItem('wiz-battles')) || {};
const savedShapes = storage.savedShapes || [];
if (savedShapes.length)
    store.dispatch(checkSavedImages(savedShapes));

const target = document.getElementById('root');

render(
    <Provider store={store}>
        <BrowserRouter>
            <StartPage />
        </BrowserRouter>
    </Provider>
    , target
);
