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

export const user = (state = {}, action) => {
    switch (action.type) {
        case AT.UPDATE_USER: 
            return {
                ...action.payload
            };
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

export const game = (state = {}, action) => {
    switch (action.type) {
        case AT.UPDATE_GAME: 
            return {
                ...action.payload
            };
        case (AT.SET_SOUNDS_VOLUME):
            return {
                ...state,
                soundsVolume: action.payload
            };
        case (AT.SET_MUSIC_VOLUME):
            return {
                ...state,
                musicVolume: action.payload
            };
        case (AT.START_BATTLE):
            return {
                ...state,
                startBattle: action.payload,
            };
        case (AT.SET_LANGUAGE) :
            return {
                ...state,
                lang: action.payload,
            }
        case (AT.SAVE_TOKEN):
            return {
                ...state,
                token: action.payload,
            }
        case AT.UPDATE_GAME_STATE:
            return {
                ...action.payload,
            }
            case (AT.SET_BATTLE_TIME_LIMIT):
            return {
                ...state,
                timeLimit: action.payload,
            };
        case (AT.SET_BATTLE_DIFFICULTY):
            return {
                ...state,
                difficulty: action.payload,
            };
        default:
            return state;
    }
};

export const hero = (state = {}, action) => {
    switch (action.type) {
        case AT.UPDATE_HERO: 
            return {
                ...action.payload
            };
        // case (AT.RESET_HERO):
        //     return {
        //         ...action.payload,
        //     };
        case (AT.SET_HERO_IMAGE):
            return {
                ...state,
                imageName: action.payload,
            };
        case (AT.SET_HERO_NAME):
            return {
                ...state,
                nickName: action.payload,
            };
        case (AT.LEVEL_UP):
            return {
                ...state,
                level: parseInt(state.level, 10) + 1,
            };
        case (AT.SET_BATTLES_WIN):
            return {
                ...state,
                battlesWin: parseInt(state.battlesWin, 10) + 1,
            };
        case (AT.SET_BATTLES_LOST):
            return {
                ...state,
                battlesLost: parseInt(state.battlesLost, 10) + 1,
            };
        case (AT.SET_MONSTERS_DEFEATED):
            return {
                ...state,
                monstersDefeated: state.monstersDefeated + 1,
            };
        case (AT.SET_TASKS_RESOLVED):
            return {
                ...state,
                tasksResolved: parseInt(state.tasksResolved, 10) + 1,
            };
        case (AT.SET_TASKS_FAILED):
            return {
                ...state,
                tasksFailed: parseInt(state.tasksFailed, 10) + 1,
            };
        case (AT.SET_EXPERIENCE):
            return {
                ...state,
                experience: action.payload,
            };
        case AT.UPDATE_GAME_DATA:
            return {
                ...action.payload,
            }
        default:
            return state;
    }
};
