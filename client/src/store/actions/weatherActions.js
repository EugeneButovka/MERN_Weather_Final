import {
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAIL,
    
    CLEAR_WEATHER_DATA,
} from "../actionTypes";



export const getWeatherRequestAction = () => ({
    type: GET_WEATHER_REQUEST,
});

export const getWeatherSuccessAction = (payload) => ({
    type: GET_WEATHER_SUCCESS,
    payload: payload
});

export const getWeatherFailAction = (payload) => ({
    type: GET_WEATHER_FAIL,
    payload: payload
});



export const clearWeatherDataAction = () => ({
    type: CLEAR_WEATHER_DATA,
});

