import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import events from './events';
import map from './map';
import view from './view';
import details from './details';
import filter from './filter';

const rootReducer = combineReducers({ auth, events, map, view, details, filter, routing: routerReducer });

export default rootReducer;
