import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import events from './events';
import map from './map';
import view from './view';
import details from './details';

const rootReducer = combineReducers({ auth, events, map, view, details, routing: routerReducer });

export default rootReducer;
