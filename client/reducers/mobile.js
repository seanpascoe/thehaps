const mobile = (state = {mobile: false}, action ) => {
  switch (action.type) {
    case 'SET_MOBILE':
      return {
        ...state,
        mobile: true
      };
    default:
      return state;
  }
};

export default mobile;
