/**
 * project new-wiz-bat
 */
import { all } from 'redux-saga/effects';

import watcherUser from './watcherUser';

export default function* sagaRoot(store) {
    yield all([
        watcherUser(),
    ]);
}