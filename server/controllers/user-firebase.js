import bcrypt from 'bcryptjs';
// import uuid from 'uuid';

import {verifyUser} from '../jwt';
import {usersRef } from '../firebase/firebase';
import {initialStateGame} from '../../shared/store/initialState';
// import {expire} from '../../../shared/common/helper-functions';
import {updateAndSend} from '../services/user';

export function signUp(req, res, next) {
    const user = req.body;
    console.log(user, 'signup')
    const userRef = usersRef.doc(user.email);
    userRef.get().then(doc => {
        if (doc.exists) {
            res.status(403);
            res.statusMessage = "email_used";
            res.end();
        }
    });
    const {hero, game} = initialStateGame();
    user.password = bcrypt.hashSync(user.password, 10);
    userRef.set({user, game, hero})
        .then(docRef => {
            console.log("Document written with ID: ", docRef.id);
            res.end();
        })
        .catch(error => {
            console.error("Error adding document: ", error);
            return next(error)
        });
}

export function login(req, res, next) {
    const { password, email } = req.body;
    if (!password || !email) {
        res.status(422);
        res.statusMessage('Empty email or password sent');
        res.end();
    }
    const userRef = usersRef.doc(email);
    userRef.get().then(doc => {
        if (!doc.exists) {
            res.status(422);
            res.statusMessage = "invalid_email";
            return res.end();
        }
        const {user, user: {lang, name, email}} = doc.data();
        const tokenPayload = {lang, name, email}
        if (bcrypt.compareSync(password, user.password)) {
            updateAndSend(userRef, tokenPayload, res);
        } else {
            res.status(422);
            res.statusMessage = "invalid_password";
            res.end();
        } 
    }).catch(error => next(error));
}

export function checkRefreshToken (req, res, next) {
    const { refreshToken } = req.body;
    console.log(req.body)
    if (!refreshToken) {
        console.log('not token');
        return next();
    }
    usersRef.where("refreshToken", "==", refreshToken).get().then(snapshot => {
        if (!snapshot.docs.length) {
            res.status(401);
            res.statusMessage = "invalid_token";
            return res.end();
        }
        const {user: {name, email, lang}, expiration} = snapshot.docs[0].data();
        const tokenPayload = {name, email, lang};
        // console.log(userData, userName, Date.now() < userData.expiration);
        if (Date.now() < expiration) {
            const userRef = usersRef.doc(email);
            updateAndSend(userRef, tokenPayload, res);
        } else {
            res.status(401);
            res.statusMessage = "invalid_token";
            res.end();
        }
    }).catch(error => next(error));
}

export function changeLang(req, res, next) {
    const {userRef, body: {lang}} = req;
    if (userRef) {
        try {
            userRef.update({'user.lang': lang})
            res.end();
        } catch (e) {
            console.warn(e)
            next(e)
        }
    }
    
}
