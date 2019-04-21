import AT from './actionTypes';

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

export const saveGameData = payload => {
    return {
        type: AT.SAVE_GAME_DATA,
        payload
    };
};
