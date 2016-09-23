import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import events from './events';
import map from './map';

const rootReducer = combineReducers({ auth, events, map, routing: routerReducer });

export default rootReducer;
