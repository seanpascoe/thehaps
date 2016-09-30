const filter = (state = { selectedCategory: 'all', startDate: '', endDate: '' }, action ) => {
  switch (action.type) {
    case 'SET_SELECTED_CATEGORY':
      return {
        ...state,
        selectedCategory: action.selectedCategory
      };
    case 'GET_EVENTS':
      return {
        ...state,
        startDate: action.startDate,
        endDate: action.endDate
      };
    default:
      return state;
  }
};

export default filter;
