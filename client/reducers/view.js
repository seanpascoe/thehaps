const view = (state={}, action) => {
  switch (action.type) {
    case 'MAP_VIEW':
      return {
        icon: 'view_list',
        path: '/list'
      };
    case 'LIST_VIEW':
      return {
        icon: 'map',
        path: '/'
      };
    default:
      return state;
  }
};

export default view;
