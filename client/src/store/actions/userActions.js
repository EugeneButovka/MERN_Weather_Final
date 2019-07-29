import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    
    GET_CURRENET_USER_REQUEST,
    GET_CURRENET_USER_SUCCESS,
    GET_CURRENET_USER_FAIL,
    
    
    CHECK_LOGIN_REQUEST,
    CHECK_LOGIN_SUCCESS,
    CHECK_LOGIN_FAIL,
    
    UPDATE_CURRENT_USER_REQUEST,
    UPDATE_CURRENT_USER_SUCCESS,
    UPDATE_CURRENT_USER_FAIL,
    
    LOGOUT_USER
} from "../actionTypes";



export const registerUserRequestAction = () => ({
    type: REGISTER_USER_REQUEST,
});

export const registerUserSuccessAction = (payload) => ({
    type: REGISTER_USER_SUCCESS,
    payload: payload
});

export const registerUserFailAction = (payload) => ({
    type: REGISTER_USER_FAIL,
    payload: payload
});






export const loginUserRequestAction = () => ({
    type: LOGIN_USER_REQUEST,
});

export const loginUserSuccessAction = (payload) => ({
    type: LOGIN_USER_SUCCESS,
    payload: payload
});

export const loginUserFailAction = (payload) => ({
    type: LOGIN_USER_FAIL,
    payload: payload
});




export const checkLoginRequestAction = () => ({
    type: CHECK_LOGIN_REQUEST,
});

export const checkLoginSuccessAction = (payload) => ({
    type: CHECK_LOGIN_SUCCESS,
    payload: payload
});

export const checkLoginFailAction = (payload) => ({
    type: CHECK_LOGIN_FAIL,
    payload: payload
});





export const logoutUserAction = () => {
    return {
        type: LOGOUT_USER
    };
};




export const getCurrentUserRequestAction = () => ({
    type: GET_CURRENET_USER_REQUEST,
});

export const getCurrentUserSuccessAction = (payload) => ({
    type: GET_CURRENET_USER_SUCCESS,
    payload: payload
});

export const getCurrentUserFailAction = (payload) => ({
    type: GET_CURRENET_USER_FAIL,
    payload: payload
});




export const updateCurrentUserRequestAction = () => ({
    type: UPDATE_CURRENT_USER_REQUEST,
});

export const updateCurrentUserSuccessAction = (payload) => ({
    type: UPDATE_CURRENT_USER_SUCCESS,
    payload: payload
});

export const updateCurrentUserFailAction = (payload) => ({
    type: UPDATE_CURRENT_USER_FAIL,
    payload: payload
});