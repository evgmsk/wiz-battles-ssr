import AT from './actionTypes';

export const saveImage = payload => {
    return {
        type: AT.SET_HERO_IMAGE,
        payload,
    };
};

export const saveHero = payload => {
    return {
        type: AT.SAVE_HERO,
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

export const updateHero = payload => {
    return {
        type: AT.UPDATE_HERO,
        payload
    };
};
