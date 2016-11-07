import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import events from './events';
import map from './map';
import view from './view';
import details from './details';
import filter from './filter';
import mobile from './mobile';

const rootReducer = combineReducers({ auth, events, map, view, details, filter, mobile, routing: routerReducer });

export default rootReducer;
