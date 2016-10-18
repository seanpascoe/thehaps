const auth = (state = { isAuthenticated: false }, action ) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isAuthenticated: true,
        id: action.id,
        token: action.token,
        email: action.email,
        username: action.username
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

export default auth;
