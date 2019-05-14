import { takeLatest, put } from 'redux-saga/effects';
import ActionTypes from '../actions/actionTypes';
import axios from 'axios';

function* workerCheckRefreshToken(action) {
    let storage = localStorage.getItem('wiz-battles');
    storage = storage &&  JSON.parse(storage);
    const refreshToken = storage && storage.refreshToken;
    if (refreshToken) {
        try {
            const { data } = yield axios.post('/refresh-token', {token: refreshToken});
            console.log(data)
            yield put({ type: ActionTypes.SAVE_REFRESH_TOKEN, payload: data.refreshToken });
            yield put({ type: ActionTypes.SAVE_USER_NAME, payload: data.userName });
            yield put({ type: ActionTypes.SAVE_TOKEN, payload: data.token}); 
        } catch (err) {
            console.log(err)
        }
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

function* workerSaveRefreshToken(action) {
    const storage = JSON.parse(localStorage.getItem('wiz-battles'));
    storage.refreshToken = action.payload;
    try {
        localStorage.setItem('wiz-battles', JSON.stringify(storage));
    } catch (err) {
        console.log(err);
    }
}

function* workerLogout() {
    const storage = JSON.parse(localStorage.getItem('wiz-battles'));
    storage.refreshToken = null;
    try {
        localStorage.setItem('wiz-battles', JSON.stringify(storage));
        yield put({ type: ActionTypes.SAVE_USER_NAME, payload: ''});
        yield put({ type: ActionTypes.SAVE_TOKEN, payload: null});
    } catch (err) {
        console.log(err);
    }
}

export default function* watcherTimer() {
    yield takeLatest(ActionTypes.SAVE_REFRESH_TOKEN, workerSaveRefreshToken);
    yield takeLatest(ActionTypes.CHECK_REFRESH_TOKEN, workerCheckRefreshToken);
    yield takeLatest(ActionTypes.LOGOUT, workerLogout);
    yield takeLatest(ActionTypes.SAVE_SHAPE, workerShape);
    yield takeLatest(ActionTypes.OVERWRITE_SHAPE, workerShape);
}
