import bcrypt from 'bcryptjs';
// import jwt from 'jsonwebtoken';
import uuid from 'uuid';

import {Jwt} from '../../jwt';
import { db, usersRef } from '../firebase';
import {initialStateGame} from '../../../shared/store/initialState';
import {expire} from '../../../shared/common/helper-functions';
import updateTok from '../../services/user';

export function signUp(req, res, next) {
    const user = req.body;
    const userRef = usersRef.doc(user.email);
    userRef.get().then(doc => {
        if (doc.exists) {
            res.status(403);
            // res.statusMessage = "email_used";
            res.end();
        }
    });
    const gameData = initialStateGame();
    user.password = bcrypt.hashSync(user.password, 10);
    userRef.set({user, ...gameData})
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
    const doc = updateTok(email);
    console.log('Doc', doc)
    if (!password || !email) {
        res.status(422);
        res.statusMessage('Empty email or password sent');
        res.end();
    }
    const user = usersRef.doc(email);
    user.get().then(doc => {
        if (!doc.exists) {
            res.status(422);
            res.statusMessage = "invalid_email";
            return res.end();
        }
        const userData = doc.data();
        if (bcrypt.compareSync(password, userData.user.password)) {
            const token = Jwt.sign(userData.user);
            const refreshToken = uuid();
            const expireIn = expire();
            user.set({...userData, refreshToken, expireIn});
            res.json({userName: userData.user.name, token, refreshToken})
        } else {
            res.status(422);
            res.statusMessage = "invalid_password";
            res.end();
        } 
    }).catch(error => next(error));
}

export function checkRefreshToken (req, res, next) {
    const { token } = req.body;
    usersRef.where("refreshToken", "==", token).get().then(snapshot => {
        if (!snapshot.docs.length) {
            res.status(401);
            res.statusMessage = "invalid_token";
            return res.end();
        }
        const userData = snapshot.docs[0].data();
        const userName = userData.user.name;
        // console.log(userData, userName, Date.now() < userData.expireIn);
        if (Date.now() < userData.expireIn) {
            const token = Jwt.sign(userData);
            const refreshToken = uuid();
            const expireIn = expire();
            usersRef.doc(userData.user.email).set({...userData, refreshToken, expireIn});
            return res.json({userName, token, refreshToken});
        } else {
            res.status(401);
            res.statusMessage = "invalid_token";
            res.end();
        }
    }).catch(error => next(error));
}
