import React from 'react';
import {GoogleMapLoader, GoogleMap, InfoWindow, Marker} from 'react-google-maps';
import {triggerEvent} from 'react-google-maps/lib/utils';
import { connect } from 'react-redux';
import mapstyle from './mapstyle';
import List from './List';
import DetailView from './DetailView';
import Filter from './Filter';
import FilterButton from './FilterButton';
import MapSettingsLabel from './MapSettingsLabel';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 40.760984,
        lng: -111.8828773
      },
      activeIW: ''
    };
    this.eventDetails = this.eventDetails.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  componentDidMount() {
    window.jQuery('.filter-sideNav').sideNav({
      edge: 'right',
      closeOnClick: true
    });

    // if (navigator && navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition((pos) => {
    //     const coords = pos.coords;
    //     this.setState({
    //       center: {
    //         lat: coords.latitude,
    //         lng: coords.longitude
    //       }
    //     });
    //     this.refs.map.panTo(this.state.center);
    //   });
    // }
  }

  // componentWillUpdate() {
  //   console.log('start');
  // }

  componentDidUpdate() {
    //this fixes the map refresh problem when moving from list to map view
    if (this.props.view.mapRefreshTrigger === true) {
      triggerEvent(this.refs.map, 'resize');
      this.props.dispatch({type: 'TRIGGER_MAP', mapRefreshTrigger: false});
    }

  }

  handleMarkerClick(marker) {
    this.setState({activeIW: marker._id});
  }

  handleMarkerClose() {
    this.setState({activeIW: ''});
  }

  eventDetails(id) {
    let event = this.props.filteredEvents.filter(e => {
      return e._id === id;
    });
    event = event[0];
    this.props.dispatch({type: 'SET_EVENT', eventDetail: event});

    window.jQuery('#event-detail').openModal();
    window.jQuery('#event-detail').scrollTop(0);
  }

  renderInfoWindow(event) {
    let startTime = moment(event.startTime, 'HH:mm', true).format('h:mm a');
    return (
      <InfoWindow
        onCloseclick={this.handleMarkerClose} key={`iw-${event._id}`}>
        <div
          className="modal-trigger"
          onClick={() => this.eventDetails(event._id)}
          style={{cursor: 'pointer'}}>
          <div style={{fontWeight: 'bold'}}>{event.title}</div>
          <div>{`${event.date} - ${startTime}`}</div>
          <div>{event.primCategory}{event.primSubCategory ? ` : ${event.primSubCategory}` : ''}</div>
          <div style={{marginTop: '5px', color: '#3498db'}}>Event Details</div>
        </div>
      </InfoWindow>
    );
  }

  render() {
    // let filtCat = this.props.filter.selectedCategory;
    // let filteredEvents = this.props.events.filter(event => {
    //   if (filtCat === 'all') {
    //     return true;
    //   } else {
    //     return (
    //       filtCat === event.primCategory ||
    //       filtCat === event.primSubCategory ||
    //       filtCat === event.secCategory ||
    //       filtCat === event.secSubCategory);
    //   }
    // });

    // let eventsNumCheck;
    // if (this.props.filteredEvents.length > 100) {
    //   eventsNumCheck = this.props.filteredEvents.slice(0, 100);
    // } else {
    //   eventsNumCheck = this.props.filteredEvents;
    // }

    let eventMarkers = this.props.eventsNumCheck.map((event) => {
      let catIcon = event.primCategory.replace(/ /g, '-').replace('&', 'and');
      let icon = {
        url: `/images/icons/${catIcon}.svg`,
        anchor: new google.maps.Point(16.25,50),
      };
      return (
        <Marker
          key={event._id}
          icon={icon}
          position={{lat: parseFloat(event.lat), lng: parseFloat(event.lng)}}
          onClick={this.handleMarkerClick.bind(this, event)} >
          {this.state.activeIW === event._id ? this.renderInfoWindow(event): null}
        </Marker> );
    });

    return (
      <div id="map-list-wrapper">
        <FilterButton />
        <Filter />
        <MapSettingsLabel iw={this.state.activeIW} numMapEvents={this.props.eventsNumCheck.length} numFilteredEvents={this.props.filteredEvents.length}/>
        <GoogleMapLoader
          containerElement={<div id="g-map" style={{display: this.props.view.mapDisplay}}></div>}
          googleMapElement={
            <GoogleMap
              // center={mapCenter || this.state.center}
              defaultCenter={this.state.center}
              defaultZoom={13}
              ref='map'
              onClick={this.handleMarkerClose}
              defaultOptions={{
                mapTypeControl: false,
                streetViewControl: false,
                styles: mapstyle.styles,
                clickableIcons: false,
                zoomControlOptions: {
                  position: google.maps.ControlPosition.LEFT_BOTTOM
                }
              }}
            >
              {eventMarkers}
            </GoogleMap>
          }
        />
        <List filteredEvents={this.props.filteredEvents} />
        <DetailView />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const filtCat = state.filter.selectedCategory;
  const filteredEvents = state.events.filter(event => {
    if (filtCat === 'all') {
      return true;
    } else {
      return (
        filtCat === event.primCategory ||
        filtCat === event.primSubCategory ||
        filtCat === event.secCategory ||
        filtCat === event.secSubCategory);
    }
  });

  let eventsNumCheck;
  if (filteredEvents.length > 100) {
    eventsNumCheck = filteredEvents.slice(0, 100);
  } else {
    eventsNumCheck = filteredEvents;
  }

  return { events: state.events, filteredEvents, eventsNumCheck, view: state.view, details: state.details, filter: state.filter };
};

export default connect(mapStateToProps)(MapView);
