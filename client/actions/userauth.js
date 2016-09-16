import $ from 'jquery';

const getToken = () => {
  return Math.random().toString(36).substring(7);
};

export const login = (email, password, history, redirect) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/auth/signin',
      type: 'POST',
      data: ({ email, password })
    }).done( (res) => {
      let id = res.id;
      let token = getToken();
      sessionStorage.token = token;
      sessionStorage.userId = id;
      dispatch({ type: 'LOGIN', id, token });
      history.push(redirect);
    });
  };
};

export const signup = (email, password, history, redirect) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/auth/signup',
      type: 'POST',
      data: { email, password }
    }).done( (res) => {
      let id = res.id;
      let token = getToken();
      sessionStorage.token = token;
      sessionStorage.userId = id;
      dispatch({ type: 'LOGIN', id, token });
      history.push(redirect);
    });
  };
};

export const logout = () => {
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('token');
  return { type: 'LOGOUT' };
};
