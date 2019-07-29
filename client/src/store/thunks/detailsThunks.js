import {instance} from "../../core/axios";
import {
    getWeatherDetailsRequestAction,
    getWeatherDetailsSuccessAction,
    getWeatherDetailsFailAction
} from '../actions/detailsActions';



export const getWeatherDetails = (_id) => async dispatch => {
    console.log('Weather History details request');
    dispatch(getWeatherDetailsRequestAction());
    
    try {
        const res = await instance.get(`/api/weather/${_id}`);
        console.log('Weather history details obtained: ', res.data);
        dispatch(getWeatherDetailsSuccessAction(res.data));
    } catch (error) {
        console.log('Weather history details error: ', error);
        dispatch(getWeatherDetailsFailAction(error));
    }
};