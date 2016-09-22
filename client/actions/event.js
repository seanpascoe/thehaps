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
      url: '/eventssdfbsdfb',
      type: 'POST',
      data: { title, category, address,
              city, state, description,
              date, startTime, endTime,
              url, lat, lng}
    }).done( data => {
      console.log(data);
      Materialize.toast('Your event has been successfully submitted!', 4000);
      dispatch(event('ADD_EVENT', data));
    }).fail( data => {
      Materialize.toast('Uh, oh! There was a problem.', 4000);
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
