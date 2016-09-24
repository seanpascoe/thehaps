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
      }, eventDetail: {}
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
    let event = this.props.events.filter(e => {
      return e._id === id;
    });
    event = event[0];
    this.setState({eventDetail: event});

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
      <div id="map-list-wrapper">
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
                ref='map'>
                {events}
              </GoogleMap>
            }
          />
        </div>
        <List />


        <div id="event-detail" className="modal bottom-sheet">
          <div className="modal-content">
          <h2 className="center">{this.state.eventDetail.title}</h2>
          <h3>{this.state.eventDetail.date}</h3>
          <p>Time: {this.state.eventDetail.startTime} - {this.state.eventDetail.endTime}</p>
          <p>LOCATION NAME HERE</p>
          <p>{this.state.eventDetail.address}</p>
          <p>{this.state.eventDetail.city}, {this.state.eventDetail.state}</p>
          <br />
          <p>Description: {this.state.eventDetail.description}</p>
          <p>URL: <a href={this.state.eventDetail.url}>{this.state.eventDetail.url}</a></p>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { events: state.events, view: state.view };
};

export default connect(mapStateToProps)(MapView);

// export default MapView;
