import React from 'react';
import { Route, IndexRoute } from 'react-router';
import { UserAuthWrapper } from 'redux-auth-wrapper';
import App from './containers/App';
import MapView from './components/MapView';
import NotFound from './components/NotFound';
import AddEvent from './components/AddEvent';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: history.push,
  failureRedirectPath: '/login',
  wrapperDisplayName: 'UserIsAuthenticated'
});

export default (
  <Route>
    <Route path="/" component={App}>
      <IndexRoute component={MapView} />
      <Route path="/add-event" component={UserIsAuthenticated(AddEvent)} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Signup} />
      <Route path="/contact" component={Contact} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
