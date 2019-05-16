/**
 * project new-wiz-bat
 */
const express = require('express');
const {game} = require('../controllers/base');
//const verify = require('../middleware/verify');

const gameRouter = express.Router();


/* GET home page. */

gameRouter.get('/game*', game);

module.exports = gameRouter;