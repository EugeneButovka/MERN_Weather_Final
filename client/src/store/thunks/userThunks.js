import {instance} from "../../core/axios";
import {
    registerUserRequestAction,
    registerUserSuccessAction,
    registerUserFailAction,
    
    loginUserRequestAction,
    loginUserSuccessAction,
    loginUserFailAction,
    
    checkLoginRequestAction,
    checkLoginSuccessAction,
    checkLoginFailAction,
    
    getCurrentUserRequestAction,
    getCurrentUserSuccessAction,
    getCurrentUserFailAction,
    
    updateCurrentUserRequestAction,
    updateCurrentUserSuccessAction,
    updateCurrentUserFailAction
} from '../actions/userActions';


export const loginUser = user => async dispatch => {
    console.log('Login request: ', user);
    dispatch(loginUserRequestAction());
    
    try {
        const res = await instance.post('/auth/login', user);
        console.log('Login success: ', res);
        dispatch(loginUserSuccessAction(res.data));
        localStorage.setItem('token', res.data.token)
    } catch (error) {
        console.log('Login error: ', error);
        dispatch(loginUserFailAction(error));
    }
};

export const registerUser = user => async dispatch => {
    console.log('Register request: ', user);
    dispatch(registerUserRequestAction());
    
    let res = null;
    try {
        res = await instance.post('/auth/register', user);
        console.log('Register success: ', res.data);
        dispatch(registerUserSuccessAction(res.data));
    } catch (error) {
        console.log('Register error: ', error.response);
        dispatch(registerUserFailAction(error));
    }
};

export const checkLogin = () => async dispatch => {
    console.log('Check login request');
    dispatch(checkLoginRequestAction());
    
    try {
        const res = await instance.get('/auth/checkLogin');
        console.log('Check login success: ', res.data);
        dispatch(checkLoginSuccessAction(res.data));
    } catch (error) {
        console.log('Register error: ', error);
        dispatch(checkLoginFailAction(error));
    }
};

//user _id is transmitted in token in packet header with axios intercepter
export const getCurrentUser = () => async dispatch => {
    console.log('Current user info request');
    dispatch(getCurrentUserRequestAction());
    
    try {
        const res = await instance.get('/api/user');
        console.log('User info success: ', res.data);
        dispatch(getCurrentUserSuccessAction(res.data));
    } catch (error) {
        console.log('User info error: ', error);
        dispatch(getCurrentUserFailAction(error));
    }
};



export const updateCurrentUser = param => async dispatch => {
    console.log('Updating current user');
    dispatch(updateCurrentUserRequestAction());
    
    let res = null;
    try {
        res = await instance.post('/api/user', param);
        console.log('Updating current user success: ', res.data);
        dispatch(updateCurrentUserSuccessAction(res.data));
    } catch (error) {
        console.log('Updating current user error: ', error.response);
        dispatch(updateCurrentUserFailAction(error));
    }
};