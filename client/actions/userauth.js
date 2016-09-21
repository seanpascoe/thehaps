import $ from 'jquery';

const getToken = () => Math.random().toString(36).substring(7);

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
      Materialize.toast('You have signed in', 4000);
    }).fail( (data) => {
      Materialize.toast('Failed to log in. Please check email and password.', 4000);
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
      Materialize.toast('Successfully signed up!', 4000);
    }).fail( (data) => {
      Materialize.toast(data.responseJSON, 4000);
    });
  };
};

export const logout = () => {
  Materialize.toast('You have logged out!', 4000)
  sessionStorage.removeItem('userId');
  sessionStorage.removeItem('token');
  return { type: 'LOGOUT' };
};
