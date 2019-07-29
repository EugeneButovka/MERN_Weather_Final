import {
    GET_WEATHER_REQUEST,
    GET_WEATHER_SUCCESS,
    GET_WEATHER_FAIL,
    
    CLEAR_WEATHER_DATA,
} from "../actionTypes";

const initialState = {
    weatherData: {},
    requestCompleted: false,
    error: null,
    isLoading: false,
    isSaving: false,
    saveCompleted: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        //weather request routine
        case GET_WEATHER_REQUEST:
            return {
                ...state,
                isLoading: true
            };
        case GET_WEATHER_SUCCESS:
            return {
                ...state,
                weatherData: action.payload,
                requestCompleted: true,
                error: null,
                isLoading: false
            };
        case GET_WEATHER_FAIL:
            return {
                ...state,
                weatherData: null,
                requestCompleted: true,
                isLoading: false,
                error: 'weather request fail'
            };
    
    
        case CLEAR_WEATHER_DATA:
            return {
                ...state,
                weatherData: null,
                requestCompleted: false,
                isLoading: false,
                error: null
            };
        //default routine
        default:
            return state;
    }
}