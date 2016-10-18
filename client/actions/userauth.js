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
      let email = res.email;
      let username = res.username;
      localStorage.token = token;
      localStorage.userId = id;
      localStorage.email = email;
      localStorage.username = username;
      dispatch({ type: 'LOGIN', id, token, email, username });
      history.push(redirect);
      Materialize.toast('You have signed in', 4000);
    }).fail( (data) => {
      console.log(data);
      Materialize.toast(data.responseJSON, 4000);
    });
  };
};

export const signup = (email, password, username, history, redirect) => {
  return (dispatch) => {
    $.ajax({
      url: '/api/auth/signup',
      type: 'POST',
      data: { email, password, username }
    }).done( (res) => {
      let id = res.id;
      let token = getToken();
      let email = res.email;
      let username = res.username;
      localStorage.token = token;
      localStorage.userId = id;
      localStorage.email = email;
      localStorage.username = username;
      dispatch({ type: 'LOGIN', id, token, email, username });
      history.push(redirect);
      Materialize.toast('Successfully signed up!', 4000);
    }).fail( (data) => {
      if(data.responseJSON.code === 11000) {
        Materialize.toast('Email already exists', 4000);
      } else if(data.responseJSON.message) {
        Materialize.toast(data.responseJSON.message, 4000);
      } else {
        Materialize.toast('There was a problem, please contact admin', 4000);
      }
    });
  };
};

export const logout = () => {
  Materialize.toast('You have logged out!', 4000)
  localStorage.clear();
  return { type: 'LOGOUT' };
};
