const express = require('express');
const {start} = require('../controllers/base');

const indexRouter = express.Router();

/* GET home page. */
// indexRouter.get('/:id', (req, rea, next) => {
//     console.log('id', req.params.id);
//     next();
// })

indexRouter.get('/*', start);

module.exports = indexRouter;
