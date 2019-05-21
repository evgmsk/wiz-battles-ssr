import AT from './actionTypes';

export const setDifficulty = payload => {
    return {
        type: AT.SET_BATTLE_DIFFICULTY,
        payload,
    };
};

export const setTimeLimit = payload => {
    return {
        type: AT.SET_BATTLE_TIME_LIMIT,
        payload,
    };
};

export const setPVP = payload => {
    return {
        type: AT.SET_PVP,
        payload,
    };
};

export const setSoundsVolume = payload => {
    return ({
        type: AT.SET_SOUNDS_VOLUME,
        payload,
    });
};

export const setMusicVolume = payload => {
    return ({
        type: AT.SET_MUSIC_VOLUME,
        payload,
    });
};

export const resetGameHero = payload => {
    return {
        type: AT.RESET_HERO,
        payload,
    };
};

export const startBattle = payload => {
    return {
        type: AT.START_BATTLE,
        startBattle: payload,
    };
};

export const updateGame = payload => {
    return {
        type: AT.UPDATE_GAME,
        payload
    }
}

export const saveGame = payload => {
    return {
        type: AT.SAVE_GAME_DATA,
    };
};

export const saveImage = payload => {
    return {
        type: AT.SET_HERO_IMAGE,
        payload,
    };
};

export const saveName = payload => {
    return {
        type: AT.SET_HERO_NAME,
        payload,
    };
};

export const deleteItem = payload => {
    return {
        type: AT.DELETE_HERO_ITEM,
        payload,
    };
};

export const addItem = payload => {
    return {
        type: AT.ADD_HERO_ITEM,
        payload,
    };
};

export const addSpell = payload => {
    return {
        type: AT.ADD_HERO_SPELL,
        payload,
    };
};

export const levelUp = () => {
    return {
        type: AT.LEVEL_UP,
    };
};

export const setExperience = payload => {
    return {
        type: AT.SET_EXPERIENCE,
        payload,
    };
};

export const setMonstersDefeated = payload => {
    return {
        type: AT.SET_MONSTERS_DEFEATED,
        payload,
    };
};

export const setBattlesWin = () => {
    return {
        type: AT.SET_BATTLES_WIN,
    };
};

export const setBattlesLost = () => {
    return {
        type: AT.SET_BATTLES_LOST,
    };
};

export const setTaskResolved = () => {
    return {
        type: AT.SET_TASKS_RESOLVED,
    };
};

export const setTaskFailed = payload => {
    return {
        type: AT.SET_TASKS_FAILED,
        payload,
    };
};
