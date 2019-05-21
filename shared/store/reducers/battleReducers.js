import AT from '../actions/actionTypes';

export const opponent = (state = {}, action) => {
    switch (action.type) {
        case (AT.SET_OPPONENT_HEALTH):
            return {
                ...state,
                health: action.payload,
            };
        case (AT.SET_OPPONENT_EXPERIENCE):
            return {
                ...state,
                experience: action.payload,
            };
        case (AT.SET_OPPONENT_SPELL):
            return {
                ...state,
                spell: action.payload,
            };
        case (AT.SET_OPPONENT_NAME):
            return {
                ...state,
                name: action.payload,
            };
        case (AT.SET_OPPONENT):
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export const player = (state = {}, action) => {
    switch (action.type) {
        case (AT.SET_PLAYER_NAME):
            return {
                ...state,
                name: action.payload,
            };
        case (AT.SET_PLAYER_LEVEL):
            return {
                ...state,
                level: state.level + 1,
            };
        case (AT.SET_PLAYER_HEALTH):
            return {
                ...state,
                health: action.payload,
            };
        case (AT.SET_PLAYER_EXPERIENCE):
            return {
                ...state,
                experience: action.payload,
            };
        case (AT.SET_PLAYER_SPELL):
            return {
                ...state,
                spell: action.payload,
            };
        case (AT.SET_PLAYER):
            return {
                ...action.payload,
            };
        default:
            return state;
    }
};

export const battle = (state = {}, action) => {
    switch (action.type) {
        case AT.SET_BATTLE: {
            return {
                ...action.payload,
            }
        }
        case (AT.SET_BATTLE_SCENE):
            return {
                ...state,
                scene: action.payload,
            };
        case (AT.SET_TASK):
            return {
                ...state,
                task: action.payload,
            };
        case (AT.SET_PLAYER_MOVE):
            return {
                ...state,
                playerMove: action.payload,
            };
        case AT.SET_SOLUTION:
            return {
                ...state,
                solution: action.payload
            }
        default:
            return state;
    }
};
