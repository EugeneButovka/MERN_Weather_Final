import {
    GET_WEATHER_DETAILS_REQUEST,
    GET_WEATHER_DETAILS_SUCCESS,
    GET_WEATHER_DETAILS_FAIL
} from "../actionTypes";



export const getWeatherDetailsRequestAction = () => ({
    type: GET_WEATHER_DETAILS_REQUEST,
});

export const getWeatherDetailsSuccessAction = (payload) => ({
    type: GET_WEATHER_DETAILS_SUCCESS,
    payload: payload
});

export const getWeatherDetailsFailAction = (payload) => ({
    type: GET_WEATHER_DETAILS_FAIL,
    payload: payload
});