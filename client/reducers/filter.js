const filter = (state = { selectedCategory: 'all' }, action ) => {
  switch (action.type) {
    case 'SET_SELECTED_CATEGORY':
      return {
        selectedCategory: action.selectedCategory
      };
    default:
      return state;
  }
};

export default filter;
