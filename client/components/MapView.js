import React from 'react';
import {GoogleMapLoader, GoogleMap, InfoWindow, Marker} from 'react-google-maps';
import { connect } from 'react-redux';
import mapstyle from './mapstyle';
import List from './List';
import DetailView from './DetailView';
import Filter from './Filter';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 40.6142948,
        lng: -111.8962744
      },
      eventDetail: {},
      activeIW: ''
    };
    this.eventDetails = this.eventDetails.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
  }

  componentDidMount() {
    window.jQuery('.filter-sideNav').sideNav({
      edge: 'right', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });

    if (navigator && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = pos.coords;
        this.setState({
          center: {
            lat: coords.latitude,
            lng: coords.longitude
          }
        });
        this.refs.map.panTo(this.state.center);
      });
    }
  }

  handleMarkerClick(marker) {
    this.setState({activeIW: marker._id});
  }

  handleMarkerClose() {
    this.setState({activeIW: ''});
  }

  eventDetails(id) {
    let event = this.props.events.filter(e => {
      return e._id === id;
    });
    event = event[0];
    this.props.dispatch({type: 'SET_EVENT', eventDetail: event});

    window.jQuery('#event-detail').openModal();
  }

  renderInfoWindow(event) {
    return (
      <InfoWindow
        onCloseclick={this.handleMarkerClose} >
        <div>
          <div>{event.title}</div>
          <a className="modal-trigger"
             onClick={() => this.eventDetails(event._id)}
             style={{ cursor: 'pointer' }}>event details</a>
        </div>
      </InfoWindow>
    );
  }

  render() {
    let mapCenter;
    if(this.refs.map) {
      mapCenter = this.refs.map.getCenter();
    }

    let filtCat = this.props.filter.selectedCategory;
    let filteredEvents = this.props.events.filter(event => {
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

    let events = filteredEvents.map((event) => {
      return (
        <Marker
          key={event._id}
          icon={`/images/icons/soccer.png`}
          position={{lat: parseFloat(event.lat), lng: parseFloat(event.lng)}}
          onClick={this.handleMarkerClick.bind(this, event)} >
          {this.state.activeIW === event._id ? this.renderInfoWindow(event): null}
        </Marker> );

    });
    return (
      <div id="map-list-wrapper">
        <a className="btn-floating btn-large waves-effect waves-light red filter-sideNav"
           data-activates="slide-out1"
           style={{ position: 'fixed', bottom: '10px', right: '10px' }}
           onClick={() => this.filterOption(this)}>
          <i style={{fontSize: '2.3rem'}} className="material-icons">filter_list</i>
        </a>
        <Filter />
        <div id="g-map-wrapper" style={{display: this.props.view.mapDisplay}}>
          <GoogleMapLoader
            containerElement={<div id="g-map"></div>}
            googleMapElement={
              <GoogleMap
                center={mapCenter || this.state.center}
                defaultZoom={11}
                ref='map'
                onClick={this.handleMarkerClose}
                defaultOptions={{
                  mapTypeControl: false,
                  streetViewControl: false,
                  styles: mapstyle.styles,
                  zoomControlOptions: {
                    position: google.maps.ControlPosition.LEFT_TOP
                  }
                }}
              >
                {events}
              </GoogleMap>
            }
          />
        </div>
        <List filteredEvents={filteredEvents} />
        <DetailView />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, view: state.view, details: state.details, filter: state.filter };
};

export default connect(mapStateToProps)(MapView);

// export default MapView;
