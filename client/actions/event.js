// import $ from 'jquery';

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
    contactEmail: data.contactEmail,
    contactNumber: data.contactNumber,
    lat: data.lat,
    lng: data.lng
  };
};

export const addEvent = (title, primCategory, primSubCategory,
                           secCategory, secSubCategory, locationName,
                           address, city, state, description,
                           date, startTime, endTime, timeValue,
                           url, host, contactEmail, contactNumber, lat, lng,
                           creatorId, creatorEmail) => {
  return(dispatch) => {
    window.jQuery.ajax({
      url: '/events',
      type: 'POST',
      data: { title, primCategory, primSubCategory,
               secCategory, secSubCategory, locationName,
               address, city, state, description,
               date, startTime, endTime, timeValue,
               url, host, contactEmail, contactNumber, lat, lng,
               creatorId, creatorEmail }
    }).done( data => {
      Materialize.toast('Your event has been successfully submitted for review!', 4000);
      dispatch(event('ADD_EVENT', data));
    }).fail( (data,text,err) => {
      console.log('post problem', data);
      console.log('text', text);
      console.log('error', err);
      Materialize.toast('Uh, oh! There was a problem.', 4000);
    });
  };
};

export const fetchEvents = (
  startDate,
  endDate,
  maxLat = 40.785293884504796,
  minLat = 40.703228647350485,
  maxLng = -111.78194041035158,
  minLng = -111.98381418964846) => {
  return(dispatch) => {
    window.jQuery.ajax({
      type: 'GET',
      url: '/events',
      data: {startDate, endDate, maxLat, minLat, maxLng, minLng}
    }).done( events => {
      dispatch(getEvents(events, startDate, endDate, maxLat, minLat, maxLng, minLng));
    });
  };
};


const getEvents = (events, startDate, endDate, maxLat, minLat, maxLng, minLng) => {
  return {
    type: 'GET_EVENTS',
    events, startDate, endDate, maxLat, minLat, maxLng, minLng
  };
};

export const fetchEventDetails = (id) => {
  return(dispatch) => {
    window.jQuery.ajax({
      type: 'GET',
      url: '/events/details',
      data: {id}
    }).done( event => {
      dispatch(setEventDetail(event));
    });
  };
};

const setEventDetail = (event) => {
  return {
    type: 'SET_EVENT',
    eventDetail: event
  };
};
