import React from 'react';
import {GoogleMapLoader, GoogleMap, InfoWindow, Marker} from 'react-google-maps';
import {triggerEvent} from 'react-google-maps/lib/utils';
import { connect } from 'react-redux';
import { fetchEvents, fetchEventDetails } from '../actions/event';
import { getFilteredEvents, getEventsNumCheck } from '../selectors/selectors';
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
      activeIW: '',
      boundsChangedTimeout: 0
    };
    this.eventDetails = this.eventDetails.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.boundsChanged = this.boundsChanged.bind(this);
  }

  componentWillMount() {
    //fetches initial events for current day, and default location

    let startDate = this.props.filter.startDate || moment().startOf('day').format('x');
    let endDate = this.props.filter.endDate || moment().endOf('day').format('x');
    let maxLat = this.props.mapBounds.maxLat || 40.785293884504796;
    let minLat = this.props.mapBounds.minLat || 40.703228647350485;
    let maxLng = this.props.mapBounds.maxLng || -111.78194041035158;
    let minLng = this.props.mapBounds.minLng || -111.98381418964846;

    this.props.dispatch(fetchEvents(startDate, endDate, maxLat, minLat, maxLng, minLng));
  }

  componentDidMount() {
    //initialialize modals
    window.jQuery('.filter-sideNav').sideNav({
      edge: 'right',
      closeOnClick: true
    });
    window.jQuery('#event-detail').modal();

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
    //     this.boundsChanged();
    //   });
    // }
  }

  componentDidUpdate() {
    //this fixes the map refresh problem when moving from list to map view
    if (this.props.view.mapRefreshTrigger === true) {
      triggerEvent(this.refs.map, 'resize');
      this.props.dispatch({type: 'TRIGGER_MAP', mapRefreshTrigger: false});
    }
  }


  boundsChanged() {
    // if (this.state.boundsChangedTimeout) {
    //   clearTimeout(this.state.boundsChangedTimeout);
    //   this.setState({boundsChangedTimeout: 0})
    // }
    // this.setState({
    //   boundsChangedTimeout: setTimeout(() => {
    //     console.log('hello!');
    //   }, 1000)
    // });
    // console.log("Top Latitude:" + this.refs.map.getBounds().getNorthEast().lat())
    // console.log("Right Longitude:" + this.refs.map.getBounds().getNorthEast().lng())
    // console.log("Bottom Latitude:" + this.refs.map.getBounds().getSouthWest().lat())
    // console.log("Left Longitude" + this.refs.map.getBounds().getSouthWest().lng())

    const maxLat = this.refs.map.getBounds().getNorthEast().lat();
    const minLat = this.refs.map.getBounds().getSouthWest().lat();
    const maxLng = this.refs.map.getBounds().getNorthEast().lng();
    const minLng = this.refs.map.getBounds().getSouthWest().lng();

    this.props.dispatch(fetchEvents(
      this.props.filter.startDate, this.props.filter.endDate,
      maxLat, minLat, maxLng, minLng));
  }

  handleMarkerClick(marker) {
    this.setState({activeIW: marker._id});
  }

  handleMarkerClose() {
    this.setState({activeIW: ''});
  }

  eventDetails(id) {
    window.jQuery('#event-detail').modal('open');
    window.jQuery('#event-detail').scrollTop(0);

    //replaced filter method with find method for performance gains
    const event = this.props.filteredEvents.find(e => e._id === id);
    this.props.dispatch({type: 'SET_EVENT', eventDetail: event});

    //place comment fetch action/reducer here using event id
    this.props.dispatch(fetchEventDetails(id));

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
          position={{lat: event.lat, lng: event.lng}}
          onClick={this.handleMarkerClick.bind(this, event)} >
          {this.state.activeIW === event._id ? this.renderInfoWindow(event): null}
        </Marker> );
    });

    return (
      <div id="map-list-wrapper">
        <FilterButton />
        <Filter />
        <MapSettingsLabel
          iw={this.state.activeIW} numMapEvents={this.props.eventsNumCheck.length} numFilteredEvents={this.props.filteredEvents.length}/>
        <GoogleMapLoader
          containerElement={<div id="g-map" style={{display: this.props.view.mapDisplay}}></div>}
          googleMapElement={
            <GoogleMap
              // center={mapCenter || this.state.center}
              defaultCenter={this.state.center}
              defaultZoom={13}
              ref='map'
              onClick={this.handleMarkerClose}
              onDragend={this.boundsChanged}
              onZoomChanged={this.boundsChanged}
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
        <List />
        <DetailView />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filteredEvents: getFilteredEvents(state),
    eventsNumCheck: getEventsNumCheck(state),
    mapBounds: state.map.mapBounds,
    filter: state.filter,
    view: state.view };
};

export default connect(mapStateToProps)(MapView);
