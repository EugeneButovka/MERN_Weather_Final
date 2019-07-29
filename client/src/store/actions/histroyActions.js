import {
    GET_WEATHER_HISTORY_REQUEST,
    GET_WEATHER_HISTORY_SUCCESS,
    GET_WEATHER_HISTORY_FAIL
} from "../actionTypes";



export const getHistoryRequestAction = () => ({
    type: GET_WEATHER_HISTORY_REQUEST,
});

export const getHistorySuccessAction = (payload) => ({
    type: GET_WEATHER_HISTORY_SUCCESS,
    payload: payload
});

export const getHistoryFailAction = (payload) => ({
    type: GET_WEATHER_HISTORY_FAIL,
    payload: payload
});