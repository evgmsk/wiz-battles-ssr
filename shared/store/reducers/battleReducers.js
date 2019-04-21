/**
 * project new-wiz-bat
 */
import AT from '../actions/actionTypes';

const opponent = (state = {}, action) => {
    switch (action.type) {
        case (AT.SET_OPPONENT_HEALTH):
            return {
                ...state,
                health: action.health,
            };
        case (AT.SET_OPPONENT_EXPERIENCE):
            return {
                ...state,
                experience: action.experience,
            };
        case (AT.SET_OPPONENT_SPELL):
            return {
                ...state,
                spell: action.spell,
            };
        case (AT.SET_OPPONENT_NAME):
            return {
                ...state,
                name: action.name,
            };
        default:
            return state;
    }
};

const player = (state = {}, action) => {
    switch (action.type) {
        case (AT.SET_PLAYER_NAME):
            return {
                ...state,
                name: action.name,
            };
        case (AT.SET_PLAYER_LEVEL):
            return {
                ...state,
                level: state.level + 1,
            };
        case (AT.SET_PLAYER_HEALTH):
            return {
                ...state,
                health: action.health,
            };
        case (AT.SET_PLAYER_EXPERIENCE):
            return {
                ...state,
                experience: action.experience,
            };
        case (AT.SET_PLAYER_SPELL):
            return {
                ...state,
                spell: action.spell,
            };
        default:
            return state;
    }
};

const battle = (state = {}, action) => {
    switch (action.type) {
        case (AT.SET_PLAYER):
            return {
                ...state,
                player: action.player,
            };
        case (AT.SET_PLAYER_NAME):
            return {
                ...state,
                player: player(state.player, action),
            };
        case (AT.SET_PLAYER_SPELL):
            return {
                ...state,
                player: player(state.player, action),
            };
        case (AT.SET_PLAYER_EXPERIENCE):
            return {
                ...state,
                player: player(state.player, action),
            };
        case (AT.SET_PLAYER_HEALTH):
            return {
                ...state,
                player: player(state.player, action),
            };
        case (AT.SET_PLAYER_LEVEL):
            return {
                ...state,
                player: player(state.player, action),
            };
        case (AT.SET_OPPONENT):
            return {
                ...state,
                opponent: action.opponent,
            };
        case (AT.SET_OPPONENT_NAME):
            return {
                ...state,
                opponent: opponent(state.opponent, action),
            };
        case (AT.SET_OPPONENT_SPELL):
            return {
                ...state,
                opponent: opponent(state.opponent, action),
            };
        case (AT.SET_OPPONENT_EXPERIENCE):
            return {
                ...state,
                opponent: opponent(state.opponent, action),
            };
        case (AT.SET_OPPONENT_HEALTH):
            return {
                ...state,
                opponent: opponent(state.opponent, action),
            };
        case (AT.SET_BATTLE_SCENE):
            return {
                ...state,
                scene: action.scene,
            };
        case (AT.SET_TASK):
            return {
                ...state,
                task: action.task,
            };
        case (AT.SET_BATTLE_TIME_LIMIT):
            return {
                ...state,
                timeLimit: action.timeLimit,
            };
        case (AT.SET_BATTLE_DIFFICULTY):
            return {
                ...state,
                difficulty: action.difficulty,
            };
        case (AT.SET_PLAYER_MOVE):
            return {
                ...state,
                playerMove: action.playerMove,
            };
        default:
            return state;
    }
};