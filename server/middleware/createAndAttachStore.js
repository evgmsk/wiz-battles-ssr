import {initialStateStart, initialStateGame} from '../../shared/store/initialState';
import storeFactory from '../../shared/store';

const initialState = {...initialStateStart(), ...initialStateGame()};
console.log(initialState);

module.exports = function attachStore(req, res, next) {
    const serverStore = storeFactory(null, initialState);
    req.store = serverStore;
    next();
}