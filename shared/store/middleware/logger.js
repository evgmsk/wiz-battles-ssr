/**
 * project new-wiz-bat
 */
const logger = store => next => action => {
    console.log(action, localStorage, store.getState());
    return next(action);
};

export default logger;
