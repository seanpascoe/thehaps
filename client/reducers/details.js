const details = (state = { }, action ) => {
  switch (action.type) {
    case 'SET_EVENT':
      return {
        ...state,
        ...action.eventDetail
      };
    case 'ADD_COMMENT':
      return {
        ...state,
        comments: action.comments
      }
    default:
      return state;
  }
};

export default details;
