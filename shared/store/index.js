/**
 * project smartWizBattle
 */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import game from './reducers/gameReducers';
import hero from './reducers/heroRedusers';
import app from './reducers/appReducers';
import { initialStateStart, initialStateGame } from './initialState';
import AT from './actions/actionTypes';
import sagaRoot from './saga/sagaRoot';
import logger from './middleware/logger';

const initialData = initialStateStart();


const sagaMiddleware = createSagaMiddleware();

let reduxToolsExt = f => f;

const storeFactory = (window, data = initialData) => {
    if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
        reduxToolsExt =  window.__REDUX_DEVTOOLS_EXTENSION__();
    }
    const store = applyMiddleware(sagaMiddleware)(createStore)(
        combineReducers({ app }),
        data, reduxToolsExt,
    );
    sagaMiddleware.run(() => sagaRoot(store));
    return store;
};

export default storeFactory;
