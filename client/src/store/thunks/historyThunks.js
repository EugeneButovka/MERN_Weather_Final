import {instance} from "../../core/axios";
import {
    getHistoryRequestAction,
    getHistorySuccessAction,
    getHistoryFailAction
} from '../actions/histroyActions';



export const getWeatherHistory = () => async dispatch => {
    console.log('Weather History request');
    dispatch(getHistoryRequestAction());
    
    try {
        const res = await instance.get('/api/weather');
        console.log('Weather history list obtained: ', res.data);
        dispatch(getHistorySuccessAction(res.data));
    } catch (error) {
        console.log('Weather history list error: ', error);
        dispatch(getHistoryFailAction(error));
    }
};