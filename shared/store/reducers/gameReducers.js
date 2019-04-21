/**
 * project smartWizBattle
 */
import AT from '../actions/actionTypes';

const game = (state = {}, action) => {
    switch (action.type) {

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
        default:
            return state;
    }
};

export default game;
