const express = require('express');
const {start} = require('../controllers/base');

const indexRouter = express.Router();

/* GET home page. */

indexRouter.get('/*', start);

module.exports = indexRouter;
