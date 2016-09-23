import React from 'react';
import Map from '../components/mapview/Map';

import {GoogleApiWrapper} from 'google-maps-react';

import Marker from '../components/mapview/Marker';
import InfoWindow from '../components/mapview/InfoWindow';
import { connect } from 'react-redux';

export class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onInfoWindowClose = this.onInfoWindowClose.bind(this);

    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedEvent: {name:'', position:''}
    };
  }

  componentDidMount() {
    //change navbar icon and path
    this.props.dispatch({type: 'MAP_VIEW'});
  }

  onMapClick() {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  onInfoWindowClose() {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null
    })
  }

  onMarkerClick(props, marker, e) {
    this.setState({
      selectedEvent: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    let myMarkers = this.props.events.map(event => (
      <Marker key={event._id} id={event._id} onClick={this.onMarkerClick} name={event.title} lat={parseFloat(event.lat)} lng={parseFloat(event.lng)} />
    ));

    if(!this.props.loaded) {
      return <div>Loading...</div>
    }

    return (
      <div className="mapContainer">
        <Map google={this.props.google} onClick={this.onMapClick}>
          {myMarkers}
          <InfoWindow
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}
            onClose={this.onInfoWindowClose}>
            <div>
              <p>{this.state.selectedEvent.name}</p>
              <p>Lat: {this.state.selectedEvent.lat}</p>
              <p>Lat: {this.state.selectedEvent.lng}</p>
            </div>
          </InfoWindow>
        </Map>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return { events: state.events };
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyBVclnbSo5qaDo0AUjCAHn7C0b_YGCBdWM"
})(connect(mapStateToProps)(MapView));
