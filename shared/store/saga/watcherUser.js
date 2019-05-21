import { select, takeLatest, put } from 'redux-saga/effects';
import ActionTypes from '../actions/actionTypes';
import axios from 'axios';

function* workerUser(action) {
    const state = yield select();
    const user = {...state.user, ...action.payload};
    console.log(action, user);
    yield put({ type: ActionTypes.UPDATE_USER, payload: user })
}

function* workerLanguage(action) {
    const state = yield select();
    const {token} = state.user;
    if (!token)
        return;
    try {
        const res = yield axios.post('/lang', {token, lang: action.payload});
    } catch (err) {
        console.log(err)
    }
}

function* workerRefreshToken(action) {
    let storage = localStorage.getItem('wiz-battles');
    storage = storage ? JSON.parse(storage) : {};
    if (action.type === ActionTypes.CHECK_REFRESH_TOKEN) {
        const refreshToken = storage && storage.refreshToken;
        if (!refreshToken)
            return;
        try {
            const {data, data: {lang, token, userName}} = yield axios.post('/refresh-token', {refreshToken});
            yield put({ type: ActionTypes.SAVE_REFRESH_TOKEN, payload: data.refreshToken });
            yield put({type: ActionTypes.UPDATE_USER_WITH_SAGA, payload: {lang, token, userName}})
        } catch (err) {
            console.log(err)
        }
    } 
    if (action.type === ActionTypes.SAVE_REFRESH_TOKEN) {
        storage.refreshToken = action.payload || null;
        return localStorage.setItem('wiz-battles', JSON.stringify(storage));
    }
    if (action.type === ActionTypes.LOGOUT) {
        storage.refreshToken = null;
        localStorage.setItem('wiz-battles', JSON.stringify(storage));
        yield put({ type: ActionTypes.SAVE_USER_NAME, payload: ''});
        yield put({ type: ActionTypes.SAVE_TOKEN, payload: null});
    }
}

function* workerShape(action) {
    let storage = localStorage.getItem('wiz-battles');
    storage = storage ? JSON.parse(storage) : {};
    storage.savedShapes = storage.savedShapes || [];
    if (action.type === ActionTypes.SAVE_SHAPE) {
        storage.savedShapes.push(action.payload)
    } else if (action.type ===ActionTypes.OVERWRITE_SHAPE) {
        storage.savedShapes.forEach(s => {
            if (s.name === action.payload.name) {
                s.image = action.payload.image
            }
            return s
        })
    }
    yield localStorage.setItem('wiz-battles', JSON.stringify(storage));
}

export default function* watcherUser() {
    yield takeLatest(ActionTypes.SAVE_REFRESH_TOKEN, workerRefreshToken);
    yield takeLatest(ActionTypes.CHECK_REFRESH_TOKEN, workerRefreshToken);
    yield takeLatest(ActionTypes.LOGOUT, workerRefreshToken);
    yield takeLatest(ActionTypes.SAVE_SHAPE, workerShape);
    yield takeLatest(ActionTypes.OVERWRITE_SHAPE, workerShape);
    yield takeLatest(ActionTypes.SET_LANGUAGE, workerLanguage);
    yield takeLatest(ActionTypes.UPDATE_USER_WITH_SAGA, workerUser);
}
