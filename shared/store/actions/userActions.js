import AT from './actionTypes';

export const saveUserName = payload => {
    return {
        type: AT.SAVE_USER_NAME,
        payload,
    };
};

export const signup = payload => {
    return {
        type: AT.SIGNUP,
        payload,
    };
};

export const signin = payload => {
    return {
        type: AT.SIGNIN,
        payload,
    };
};

export const resetPassword = payload => {
    return {
        type: AT.RESET_PASSWORD,
        payload,
    };
};

export const checkSavedImages = payload => {
    return {
        type: AT.CHECK_SAVED_IMAGES,
        payload,
    }
}

export const saveShape = payload => {
    return {
        type: AT.SAVE_SHAPE,
        payload,
    };
};

export const overwriteShape = payload => {
    return {
        type: AT.OVERWRITE_SHAPE,
        payload,
    };
};

export const saveToken = payload => {
    return {
        type: AT.SAVE_TOKEN,
        payload,
    };
};

export const saveRefreshToken = payload => {
    console.log(payload);
    return {
        type: AT.SAVE_REFRESH_TOKEN,
        payload,
    };
};

export const logout = () => ({type: AT.LOGOUT});

export const setLanguage = payload => {
    return {
        type: AT.SET_LANGUAGE,
        payload,
    };
};

export const authenticateUser = () => {
    return {
        type: AT.CHECK_REFRESH_TOKEN,
    };
};

export const updateUser = payload => {
    return {
        type: AT.UPDATE_USER,
        payload
    };
};

export const updateUserWithSaga = payload => {
    return {
        type: AT.UPDATE_USER_WITH_SAGA,
        payload
    };
};
