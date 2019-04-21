/**
 * project WizBattle
 */
const path = require('path');

const paths = {
    prodPath: path.join(__dirname, '../wiz-battles'),
    prodPathCR: path.join(__dirname, '../wiz-battles-cr'),
    prodHtmlPath: path.join(__dirname, '../wiz-battles/index.html'),
    template: path.join(__dirname, '../public/index.html'),
    favicon:  path.join(__dirname, '../public/favicon.ico'),
    publicPath: '/',
    srcPath: path.join(__dirname, '../shared'),
    nodePath: path.join(__dirname, '../node-modules'),
    startJsPath: path.join(__dirname, '../shared/start-index.js'),
    startJsPathCr: path.join(__dirname, '../shared/start-index-cr.js'),
    gameJsPath: path.join(__dirname, '../shared/game-index.js'),
    vocabularyPath: path.join(__dirname, '../shared/assets/data/vocabulary.json'),
    dataPath: path.join(__dirname, '../shared/assets/data/monsters.json'),
};

module.exports = paths;

