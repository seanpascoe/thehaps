const events = (state = [], action) => {
  switch (action.type) {
    case 'GET_EVENTS':
      return action.events;
    case 'ADD_EVENT':
      return [
        ...state,
        {
          id: action._id,
          title: action.title,
          primCategory: action.primCategory,
          primSubCategory: action.primSubCategory,
          secCategory: action.secCategory,
          secSubCategory: action.secSubCategory,
          locationName: action.locationName,
          address: action.address,
          city: action.city,
          state: action.state,
          description: action.description,
          date: action.date,
          startTime: action.startTime,
          endTime: action.endTime,
          url: action.url,
          host: action.host,
          contactNumber: action.contactNumber,
          lat: action.lat,
          lng: action.lng
        }
      ];
    default:
      return state;
  }
};

export default events;
