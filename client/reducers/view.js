const view = (state={icon: 'view_list'}, action) => {
  switch (action.type) {
    case 'VIEW_CHANGE':
      return {
        ...state,
        icon: action.icon
      };
    default:
      return state;
  }
};

export default view;
