/**
 * project match-match-r-r
 */
import { takeLatest, put } from 'redux-saga/effects';
import ActionTypes from '../actions/actionTypes';
import axios from 'axios';

function* workerCheckRefreshToken(action) {

    const Storage = localStorage && localStorage['wiz-battles'];
    if (Storage) {
        try {
            const refreshToken = JSON.parse(Storage).refreshToken;
            if (refreshToken) {
                const { data } = yield axios.post('/refresh-token', {token: refreshToken});
                yield put({ type: ActionTypes.SAVE_REFRESH_TOKEN, payload: data.refreshToken });
                yield put({ type: ActionTypes.SAVE_USER_NAME, payload: data.userName });
                yield put({ type: ActionTypes.SAVE_TOKEN, payload: data.token})
            }
        } catch (err) {
            console.log(err)
        }
    }
}

function* workerShape(action) {
    if (action.type === 'SAVE_SHAPE') {
        const storage = localStorage.getItem('wiz-battles');
        console.log(storage);
    }
}

function* workerSaveRefreshToken(action) {
    try {
        localStorage.setItem('wiz-battles', JSON.stringify({'refreshToken': action.payload}));
    } catch (err) {
        console.log(err);
    }
}

function* workerLogout() {
    try {
        localStorage.setItem('wiz-battles', JSON.stringify({}));
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
