const details = (state = { eventDetail: {} }, action ) => {
  switch (action.type) {
    case 'SET_EVENT':
      return {
        ...state,
        eventDetail: action.eventDetail
      };
    default:
      return state;
  }
};

export default details;
