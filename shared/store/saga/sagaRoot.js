/**
 * project new-wiz-bat
 */
import { all } from 'redux-saga/effects';

import watcherApp from './watcherApp';

export default function* sagaRoot(store) {
    yield all([
        watcherApp(),
    ]);
}