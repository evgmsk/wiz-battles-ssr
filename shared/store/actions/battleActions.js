/**
 * project new-wiz-bat
 */
import AT from './actionTypes';

export const setDifficulty = payload => {
    return {
        type: AT.SET_BATTLE_DIFFICULTY,
        payload,
    };
};

export const setPVP = payload => {
    return {
        type: AT.SET_PVP,
        payload,
    };
};

export const setScene = payload => {
    return {
        type: AT.SET_BATTLE_SCENE,
        payload,
    };
};

export const setPlayerName = payload => {
    return {
        type: AT.SET_PLAYER_NAME,
        payload,
    };
};

export const setOpponentName = payload => {
    return {
        type: AT.SET_OPPONENT_NAME,
        payload,
    };
};

export const setTimeLimit = payload => {
    return {
        type: AT.SET_BATTLE_TIME_LIMIT,
        payload,
    };
};
export const setPlayerMove = playerMove => {
    return ({
        type: AT.SET_PLAYER_MOVE,
        playerMove,
    });
};
export const setPlayerLevel = level => {
    return {
        type: AT.SET_PLAYER_LEVEL,
        level,
    };
};

export const setPlayerExperience = experience => {
    return {
        type: AT.SET_PLAYER_EXPERIENCE,
        experience,
    };
};

export const setOpponentExperience = experience => {
    return {
        type: AT.SET_PLAYER_LEVEL,
        experience,
    };
};

export const setPlayerSpell = spell => {
    return ({
        type: AT.SET_PLAYER_SPELL,
        spell,
    });
};

export const setOpponentSpell = spell => {
    return ({
        type: AT.SET_OPPONENT_SPELL,
        spell,
    });
};

export const setBattle = battle => {
    return ({
        type: AT.SET_BATTLE,
        battle,
    });
};

export const setOpponent = opponent => {
    return {
        type: AT.SET_OPPONENT,
        opponent,
    };
};

export const setPlayer = player => {
    return {
        type: AT.SET_PLAYER,
        player,
    };
};

export const setOpponentHealth = health => {
    return {
        type: AT.SET_OPPONENT_HEALTH,
        health,
    };
};

export const setPlayerHealth = health => {
    return {
        type: AT.SET_PLAYER_HEALTH,
        health,
    };
};

export const setTask = task => {
    return {
        type: AT.SET_TASK,
        task,
    };
};
