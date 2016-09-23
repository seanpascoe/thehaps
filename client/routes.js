import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import { apiKey } from './apiKey';
import {GoogleApiWrapper} from 'google-maps-react';
import App from './containers/App';
import MapView from './containers/MapView';
import NotFound from './components/NotFound';
import AddEvent from './components/AddEvent';
import Login from './components/Login';
import Signup from './components/Signup';
import About from './components/About';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: history.push,
  failureRedirectPath: '/login',  //login is the default you can set it to something else
  wrapperDisplayName: 'UserIsAuthenticated'
});

const GoogleApi = GoogleApiWrapper({
  apiKey: 'AIzaSyAo85WiE3UAlnbmPJppYUK2Zl3UuRF_9NU'
});

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={GoogleApi(MapView)} />
      <Route path="/add-event" component={UserIsAuthenticated(AddEvent)} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/about" component={About} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
