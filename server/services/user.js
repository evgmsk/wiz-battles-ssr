import uuid from 'uuid';

import {expire} from '../../shared/common/helper-functions';
import {usersRef} from '../firebase/firebase';

module.exports = async function updateToken(email) {
    const userRef = usersRef.doc(email);
    console.log(userRef);
    try {
        const doc = await userRef.get();
        if(!doc) {
            throw new Error(`User was not found. Invalid email adress (${email}) was provided`)
        }
        const userDoc = doc.data();
        const refreshToken = uuid();
        const expireIn = expire();
        userRef.set({...doc, refreshToken, expireIn});
        return {userDoc, refreshToken, expireIn};
    }
    catch(e){console.log(e)};
};
