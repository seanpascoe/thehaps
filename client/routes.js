import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import NotFound from './components/NotFound';
import Home from './components/Home';
import Login from './components/Login';
import { UserAuthWrapper } from 'redux-auth-wrapper';

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.auth,
  predicate: auth => auth.isAuthenticated,
  redirectAction: history.push,
  failureRedirectPath: '/login',  //login is the default you can set it to something else
  wrapperDisplayName: 'UserIsAuthenticated'
});

export default (
  <Route>
    <Route path="/" component={App}>
      <Route path="/home" component={UserIsAuthenticated(Home)} />
      <Route path="/login" component={Login} />
      <Route path="*" component={NotFound} />
    </Route>
  </Route>
);
