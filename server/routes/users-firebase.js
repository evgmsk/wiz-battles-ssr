import express from 'express';
// import parser from 'body-parser';

import {signUp, login , checkRefreshToken} from '../firebase/controllers/user-controller';

const userRouter = express.Router();
// userRouter.use(parser.json());

userRouter.post('/signup', signUp);

userRouter.post('/refresh-token', checkRefreshToken);

userRouter.post('/login', login);

export default userRouter;
