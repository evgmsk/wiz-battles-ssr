import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import {user, game, hero} from './reducers/gameReducers';
import {battle, opponent, player} from './reducers/battleReducers';
import { initialStateStart, initialStateGame } from './initialState';
import AT from './actions/actionTypes';
import sagaRoot from './saga/sagaRoot';

const initialData = initialStateStart();

const sagaMiddleware = createSagaMiddleware();

let reduxToolsExt = f => f;

const storeFactory = (window, data = initialStateStart()) => {
    // console.log(data, 'factory data')
    let reducers = {user};
    if (data.game)
        reducers = {user, game, hero, battle, opponent, player}
    if (window && window.__REDUX_DEVTOOLS_EXTENSION__) {
        reduxToolsExt =  window.__REDUX_DEVTOOLS_EXTENSION__();
    }
    const store = applyMiddleware(sagaMiddleware)(createStore)(
        combineReducers(reducers),
        data, reduxToolsExt,
    );
    sagaMiddleware.run(() => sagaRoot());
    return store;
};

export default storeFactory;
