const map = (state = {mapBounds: '', defMapCenter: {lat: 40.760984, lng: -111.8828773}, defMapZoom: 13}, action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return {
        ...state,
        mapBounds: {
          maxLat: action.maxLat,
          minLat: action.minLat,
          maxLng: action.maxLng,
          minLng: action.minLng
        }
      };
    case 'SET_DEFAULT_MAPCENTER_AND_MAPZOOM':
      return {
        ...state,
        defMapCenter: {
          lat: action.lat,
          lng: action.lng
        },
        defMapZoom: action.zoom
      };
    case 'SET_USERLOCATION':
      return {
        ...state,
        userLocation: {
          lat: action.lat,
          lng: action.lng
        }
      };
    default:
      return state;
  }
};

export default map;
