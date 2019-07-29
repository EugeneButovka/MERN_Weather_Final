import {instance, weatherInstance} from "../../core/axios";
import {
    getWeatherRequestAction,
    getWeatherSuccessAction,
    getWeatherFailAction,
} from '../actions/weatherActions';


export const getWeather = (lat, long) => async dispatch => {
    console.log('Weather API request');
    dispatch(getWeatherRequestAction());
    
    try {
        const res = await weatherInstance.get(`/forecast?appid=0b078dc7f8ba04372a3c93f3eecba42c&units=metric&lat=${lat}&lon=${long}`);
        await instance.post('/api/weather', res.data);
        console.log('Weather API get and save to DB success: ', res.data);
        dispatch(getWeatherSuccessAction(res.data));
    } catch (error) {
        console.log('Weather API get and save to DB error: ', error);
        dispatch(getWeatherFailAction(error));
    }
};