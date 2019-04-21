/**
 * project WizBattle
 */
import AT from '../actions/actionTypes';

const shapes = (state = [], action) => {
    switch (action.type) {
        case (AT.SAVE_SHAPE):
            return [...state, action.payload];
        case (AT.OVERWRITE_SHAPE):
            return [...state.filter(sh => sh.name !== action.payload.name), action.payload];
        default:
            return state;
    }
};

const app = (state = {}, action) => {
    switch (action.type) {
        case (AT.SAVE_USER_NAME):
            return {
                ...state,
                userName: action.payload
            };
        case (AT.SAVE_SHAPE):
            return {
                ...state,
                savedShapes: shapes(state.savedShapes, action),
            };
        case (AT.OVERWRITE_SHAPE):
            return {
                ...state,
                savedShapes: shapes(state.savedShapes, action),
            };
        case (AT.SAVE_TOKEN):
            return {
                ...state,
                token: action.payload,
            };
        case (AT.SET_LANGUAGE):
            return {
                ...state,
                lang: action.payload,
            };
        default:
            return state;
    }
};

export default app;
