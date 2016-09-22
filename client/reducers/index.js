import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import auth from './auth';
import events from './events';

const rootReducer = combineReducers({ auth, events, routing: routerReducer });

export default rootReducer;
