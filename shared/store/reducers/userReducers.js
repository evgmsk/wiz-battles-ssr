import AT from '../actions/actionTypes';


const shapes = (state = [], action) => {
    switch (action.type) {
        case (AT.SAVE_SHAPE):
            return [...state, action.payload];
        case (AT.OVERWRITE_SHAPE):
            console.log(action, state)
            return [...state.map(s => {
                if (s.name === action.payload.name) {
                    s.image = action.payload.image;
                }
                return s;
            })];
        default:
            return state;
    }
};


const user = (state = {}, action) => {
    switch (action.type) {
        case (AT.SAVE_USER_NAME):
            return {
                ...state,
                userName: action.payload
            };
        case (AT.CHECK_SAVED_IMAGES):
            return {
                ...state,
                savedShapes: action.payload
            }
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

export default user;
