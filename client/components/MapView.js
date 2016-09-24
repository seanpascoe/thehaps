import React from 'react';
import {GoogleMapLoader, GoogleMap, InfoWindow, Marker} from 'react-google-maps';
import { connect } from 'react-redux';
import List from './List';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: {
        lat: 40.6142948,
        lng: -111.8962744
      }
    }
    this.eventDetails = this.eventDetails.bind(this);
  }

  componentDidMount() {
    //change navbar icon and path
    this.props.dispatch({type: 'MAP_VIEW'});

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
    console.log(id)
    window.jQuery(`#${id}`).openModal();
  }

  renderInfoWindow(ref, event) {
    return (
      //You can nest components inside of InfoWindow!
      <InfoWindow
        key={`${ref}_info_window`}
        onCloseclick={this.handleMarkerClose.bind(this, event)} >

        <div>
          <div>{event.title}</div>
          <a className="modal-trigger" onClick={() => this.eventDetails(event._id)}>event details</a>

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
      <div id="g-map-wrapper">
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
              ref='map'>
              {events}
            </GoogleMap>
          }
        />
        <List />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events };
};

export default connect(mapStateToProps)(MapView);

// export default MapView;
