const map = (state = {}, action) => {
  switch (action.type) {
    case 'SET_MAPCENTER':
      return {
        ...state,
        mapCenter: {
          lat: action.lat,
          lng: action.lng
        }
      };
    case 'SET_USERLOCATION':
      return {
        ...state,
        userLocation: {
          lat: action.lat,
          lng: action.lng
        }
      };
    case 'ADD_MAP_TO_STORE':
      return {
        ...state,
        googleMap: action.googleMap
      };
    default:
      return state;
  }
};

export default map;
