import {
    GET_WEATHER_DETAILS_REQUEST,
    GET_WEATHER_DETAILS_SUCCESS,
    GET_WEATHER_DETAILS_FAIL
} from "../actionTypes";

const initialState = {
    detailsData: {},
    error: null,
    isDetailsLoading: false,
    requestCompleted: false
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_WEATHER_DETAILS_REQUEST:
            return {
                ...state,
                isDetailsLoading: true
            };
        case GET_WEATHER_DETAILS_SUCCESS:
            return {
                ...state,
                error: null,
                isDetailsLoading: false,
                detailsData: action.payload,
                requestCompleted: true
            };
        case GET_WEATHER_DETAILS_FAIL:
            return {
                ...state,
                isDetailsLoading: false,
                error: 'weather details fail',
                requestCompleted: true
            };
            
            
        //default routine
        default:
            return state;
    }
}