import express from 'express';

import {signUp, login, checkRefreshToken, changeLang} from '../controllers/user-firebase';

const userRouter = express.Router();

userRouter.post('/signup', signUp);

userRouter.post('/refresh-token', checkRefreshToken);

userRouter.post('/login', login);

userRouter.post('/lang', changeLang);

module.exports = userRouter;
