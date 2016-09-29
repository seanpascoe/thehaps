import $ from 'jquery';

const event = (type, data) => {
  return {
    type,
    id: data._id,
    title: data.title,
    primCategory: data.primCategory,
    primSubCategory: data.primSubCategory,
    secCategory: data.secCategory,
    secSubCategory: data.secSubCategory,
    locationName: data.locationName,
    address: data.address,
    city: data.city,
    state: data.state,
    description: data.description,
    date: data.date,
    startTime: data.startTime,
    endTime: data.endTime,
    timeValue: data.timeValue,
    url: data.url,
    host: data.host,
    contactNumber: data.contactNumber,
    lat: data.lat,
    lng: data.lng
  };
};

export const addEvent = (title, primCategory, primSubCategory,
                           secCategory, secSubCategory, locationName,
                           address, city, state, description,
                           date, startTime, endTime, timeValue,
                           url, host, contactNumber, lat, lng) => {
  return(dispatch) => {
    $.ajax({
      url: '/events',
      type: 'POST',
      data: { title, primCategory, primSubCategory,
               secCategory, secSubCategory, locationName,
               address, city, state, description,
               date, startTime, endTime, timeValue,
               url, host, contactNumber, lat, lng}
    }).done( data => {
      Materialize.toast('Your event has been successfully submitted for review!', 4000);
      dispatch(event('ADD_EVENT', data));
    }).fail( data => {
      console.log(data);
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

export const fetchEvents = (startDate, endDate) => {
  return(dispatch) => {
    $.ajax({
      url: '/events',
      type: 'GET',
      data: {startDate, endDate}
    }).done( events => {
      dispatch(getEvents(events));
    });
  };
};
