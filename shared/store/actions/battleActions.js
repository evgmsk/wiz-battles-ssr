import AT from './actionTypes';


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

export const setPlayerMove = payload => {
    return ({
        type: AT.SET_PLAYER_MOVE,
        payload,
    });
};
export const setPlayerLevel = payload => {
    return {
        type: AT.SET_PLAYER_LEVEL,
        payload,
    };
};

export const setPlayerExperience = payload => {
    return {
        type: AT.SET_PLAYER_EXPERIENCE,
        payload,
    };
};

export const setOpponentExperience = payload => {
    return {
        type: AT.SET_PLAYER_LEVEL,
        payload,
    };
};

export const setPlayerSpell = payload => {
    return ({
        type: AT.SET_PLAYER_SPELL,
        payload,
    });
};

export const setOpponentSpell = payload => {
    return ({
        type: AT.SET_OPPONENT_SPELL,
        payload,
    });
};

export const setBattle = payload => {
    return ({
        type: AT.SET_BATTLE,
        payload,
    });
};

export const setOpponent = payload => {
    return {
        type: AT.SET_OPPONENT,
        payload,
    };
};

export const setPlayer = payload => {
    return {
        type: AT.SET_PLAYER,
        player,
    };
};

export const setOpponentHealth = payload => {
    return {
        type: AT.SET_OPPONENT_HEALTH,
        health,
    };
};

export const setPlayerHealth = payload => {
    return {
        type: AT.SET_PLAYER_HEALTH,
        health,
    };
};

export const setTask = payload => {
    return {
        type: AT.SET_TASK,
        task,
    };
};

export const setSolution = payload => {
    return {
        type: AT.SET_SOLUTION,
        payload,
    };
};
