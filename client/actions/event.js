import $ from 'jquery';

const event = (type, data) => {
	return {
		type,
    id: data._id,
    title: data.title,
    category: data.category,
    address: data.address,
    city: data.city,
    state: data.state,
    description: data.description,
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    url: data.url,
    lat: data.lat,
    lng: data.lng
	}
}

export const addEvent = (title, category, address,
                         city, state, description,
                         date, startTime, endTime,
                         url, lat, lng) => {
  return(dispatch) => {
    $.ajax({
      url: '/events',
      type: 'POST',
      data: { title, category, address,
              city, state, description,
              date, startTime, endTime,
              url, lat, lng}
    }).done( data => {
      console.log(data);
      dispatch(event('ADD_EVENT', data));
    });
  };
};

const getEvents = (events) => {
  return {
    type: 'GET_EVENTS',
    events
  };
};

export const fetchEvents = () => {
  return(dispatch) => {
    $.ajax({
      url: '/events',
      type: 'GET'
    }).done( events => {
      dispatch(getEvents(events));
    });
  }
}
