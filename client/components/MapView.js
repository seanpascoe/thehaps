import React from 'react';
import {GoogleMapLoader, GoogleMap, InfoWindow, Marker} from 'react-google-maps';
import { connect } from 'react-redux';
import List from './List';
import mapstyle from './mapstyle';
import Filter from './Filter';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 40.6142948,
        lng: -111.8962744
      }, eventDetail: {}
    }
    this.eventDetails = this.eventDetails.bind(this);
  }

  componentDidMount() {
    //change navbar icon and path
    this.props.dispatch({type: 'MAP_VIEW'});

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

  //Toggle to 'true' to show InfoWindow and re-renders component
  handleMarkerClick(marker) {
    marker.showInfo = true;
    this.setState(this.state);
  }

  handleMarkerClose(marker) {
    marker.showInfo = false;
    this.setState(this.state);
  }

  eventDetails(id) {
    let event = this.props.events.filter(e => {
      return e._id === id;
    });
    event = event[0];
    this.props.dispatch({ type: 'SET_EVENT', eventDetail: event});

    window.jQuery('#event-detail').openModal();
  }

  renderInfoWindow(ref, event) {
    return (
      //You can nest components inside of InfoWindow!
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, event)} >
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

    let events = this.props.events.map((event, index) => {
      const ref = `marker_${index}`;
      return ( <Marker
        key={event._id}
        ref={ref}
        icon={`/images/icons/soccer.png`}
        position={{lat: parseFloat(event.lat), lng: parseFloat(event.lng)}}
        onClick={this.handleMarkerClick.bind(this, event)} >
        {event.showInfo ? this.renderInfoWindow(ref, event) : null}
      </Marker> );

    });
    return (
      <div id="map-list-wrapper">
        <a className="btn-floating btn-large waves-effect waves-light red filter-sideNav"
           data-activates="slide-out1"
           style={{ position: 'fixed', bottom: '10px', right: '10px' }}
           onClick={this.filterOption}>
          <i className="material-icons">filter_list</i>
        </a>
        <Filter />
        <div id="g-map-wrapper" style={{display: this.props.view.mapDisplay}}>
          <GoogleMapLoader
            containerElement={
              <div
                //no idea why this div needs props
                // {...this.props}
                id="g-map"
                >
              </div>
            }
            googleMapElement={
              <GoogleMap
                center={mapCenter || this.state.center}
                defaultZoom={11}
                ref='map'
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
        <List />


        <div id="event-detail" className="modal bottom-sheet">
          <div className="modal-content">
          <h2 className="center">{this.props.details.eventDetail.title}</h2>
          <h3>{this.props.details.eventDetail.date}</h3>
          <p>Time: {this.props.details.eventDetail.startTime} - {this.props.details.eventDetail.endTime}</p>
          <p>LOCATION NAME HERE</p>
          <p>{this.props.details.eventDetail.address}</p>
          <p>{this.props.details.eventDetail.city}, {this.props.details.eventDetail.props}</p>
          <br />
          <p>Description: {this.props.details.eventDetail.description}</p>
          <p>URL: <a href={this.props.details.eventDetail.url}>{this.props.details.eventDetail.url}</a></p>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, view: state.view, details: state.details };
};

export default connect(mapStateToProps)(MapView);

// export default MapView;
