/**
 * project new-wiz-bat
 */
import React from 'react';
import  ReactDom, { render } from 'react-dom';
import { BrowserRouter }  from 'react-router-dom'
import 'typeface-roboto';
import {Provider} from 'react-redux';

// import './GameFunctions/TaskGenerators/langaugeTaskGenerator';
/*import { onSaveMonster } from '../src/actions/actions/gameDataActions';
 import Monsters from './data/monsters.json';*/
/*import AppContainer from './Containers/appContainer';*/
import StartPage from './start/start-page-cr'
import storeFactory from './store/index';
import {initialStateStart} from './store/initialState';
import {authenticateUser} from './store/actions/appActions';

import './assets/favicon.ico'

import '../shared/scss/reset.scss';

const store = storeFactory(window, initialStateStart());
store.dispatch(authenticateUser());

const target = document.getElementById('root');

render(
    <Provider store={store}>
        <BrowserRouter>
            <StartPage />
        </BrowserRouter>
    </Provider>
    , target
);
