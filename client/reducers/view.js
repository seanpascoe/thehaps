const view = (state={mapDisplay: 'block', listDisplay: 'none', icon: 'view_list'}, action) => {
  switch (action.type) {
    case 'VIEW_CHANGE':
      return {
        icon: action.icon,
        mapDisplay: action.mapDisplay,
        listDisplay: action.listDisplay
      };
    default:
      return state;
  }
};

export default view;
