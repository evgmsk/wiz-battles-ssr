/**
 * project new-wiz-bat
 */
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import uuid from 'uuid';

import { db } from '../firebase';
import expire from '../../../shared/common/helper-functions/expiration';

import {jwtOptions, jwtPrivetKey} from '../../../config/server-conf';

export function signUp(req, res, next) {
    const user = req.body;
    const checkQwery = db.collection("users").doc(user.email);
    checkQwery.get().then(doc => {
        if (doc.exists) {
            res.status(403);
            // res.statusMessage = "email_used";
            res.end();
        }
    });
    user.password = bcrypt.hashSync(user.password, 10);
    db.collection("users").doc(user.email).set({...user})
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
    const users = db.collection("users");
    const user = users.doc(email);
    return user.get().then(doc => {
        if (doc.exists) {
            const userData = doc.data();
            if (bcrypt.compareSync(password, userData.password)) {
                const token = jwt.sign(userData, jwtPrivetKey, jwtOptions);
                const refreshToken = uuid();
                const expiration = expire();
                user.set({...userData, refreshToken, expiration});
                res.json({userName: userData.name, token, refreshToken})
            } else {
                res.status(422);
                res.statusMessage = "invalid_password";
                res.end();
            }
        } else {
            res.status(422);
            res.statusMessage = "invalid_email";
            res.end();
        }
    }).catch(error => next(error));
}

export function checkRefreshToken (req, res, next) {
    const { token } = req.body;
    const users = db.collection("users");
    users.where("refreshToken", "==", token).get().then(snapshot => {
        console.log('exist?', snapshot.docs.length);
        if (snapshot.docs.length) {
            const userData = snapshot.docs[0].data();
            console.log(userData, Date.now(), userData.expiration, Date.now() < userData.expiration);
            if (Date.now() < userData.expiration) {
                const token = jwt.sign(userData, jwtPrivetKey, jwtOptions);
                const refreshToken = uuid();
                const expiration = expire();
                users.doc(userData.email).set({...userData, refreshToken, expiration});
                return res.json({userName: userData.name, token, refreshToken})
            } else {
                res.status(401);
                res.statusMessage = "expired_token";
                res.end();
            }
        } else {
            res.status(401);
            res.statusMessage = "expired_token";
            res.end();
        }
    }).catch(error => next(error));
}
