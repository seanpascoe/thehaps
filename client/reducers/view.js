const view = (state={icon: 'view_list', loginLoading: false}, action) => {
  switch (action.type) {
    case 'VIEW_CHANGE':
      return {
        ...state,
        icon: action.icon
      };
    case 'LOGIN_LOADING':
      return {
        ...state,
        loginLoading: true
      };
    case 'LOGIN_LOADING_DONE':
      return {
        ...state,
        loginLoading: false
      }
    default:
      return state;
  }
};

export default view;
