/**
 * project new-wiz-bat
 */
import express from 'express';

import {langController} from '../controllers/langController';

const langRouter = express.Router();


/* GET home page. */

langRouter.get('/lang', langController);

export default langRouter;