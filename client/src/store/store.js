import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {combineReducers} from 'redux';

import userReducer from "./reducers/userReducer";
import weatherReducer from "./reducers/weatherReducer";
import historyReducer from "./reducers/histroryReducer";
import detailsReducer from "./reducers/detailsReducer";

const combinedReducers = combineReducers({
    userStore: userReducer,
    weatherStore: weatherReducer,
    historyStore: historyReducer,
    detailsStore: detailsReducer
});

const initialState = {};

const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(combinedReducers, initialState, composeEnhancers(
    applyMiddleware(...middleware)
));

export default store;
