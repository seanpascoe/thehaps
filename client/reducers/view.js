const view = (state={icon: 'view_list', mapDisplay: 'block', listDisplay: 'none', mapRefreshTrigger: false}, action) => {
  switch (action.type) {
    case 'VIEW_CHANGE':
      return {
        ...state,
        icon: action.icon,
        mapDisplay: action.mapDisplay,
        listDisplay: action.listDisplay
      };
    case 'TRIGGER_MAP':
      return {
        ...state,
        mapRefreshTrigger: action.mapRefreshTrigger
      };
    default:
      return state;
  }
};

export default view;
