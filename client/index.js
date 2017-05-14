import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';
import routes from './routes';
import { Provider } from 'react-redux';
import store, { history } from './store';
var ReactGA = require('react-ga');

ReactGA.initialize('UA-99094001-1');

function logPageView() {
  ReactGA.set({ page: window.location.pathname + window.location.search });
  ReactGA.pageview(window.location.pathname + window.location.search);
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} onUpdate={logPageView} />
  </Provider>,
  document.getElementById('content')
);
