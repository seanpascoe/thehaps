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



export class MapView extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeIW: ''
    };
    this.eventDetails = this.eventDetails.bind(this);
    this.handleMarkerClose = this.handleMarkerClose.bind(this);
    this.boundsChanged = this.boundsChanged.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }

  componentWillMount() {
    //fetches initial events for current day, and default location
    let startDate = this.props.filter.startDate || moment().startOf('day').format('x');
    let endDate = this.props.filter.endDate || moment().endOf('day').format('x');
    let maxLat = this.props.mapBounds.maxLat;
    let minLat = this.props.mapBounds.minLat;
    let maxLng = this.props.mapBounds.maxLng;
    let minLng = this.props.mapBounds.minLng;

    this.props.dispatch(fetchEvents(startDate, endDate, maxLat, minLat, maxLng, minLng));
  }

  componentDidMount() {
    //initialialize modals
    window.jQuery('.filter-sideNav').sideNav({
      edge: 'right',
      closeOnClick: true,
      draggable: false
    });
    window.jQuery('#event-detail').modal();

    this.props.dispatch({type: 'VIEW_CHANGE', icon: 'view_list'});


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

  componentDidUpdate(prevProps) {
    //this fixes the map refresh problem when moving from list to map view
    if(prevProps.view.icon === 'map' && this.props.view.icon === 'view_list') {
      triggerEvent(this.refs.map, 'resize');
    }
  }

  componentWillUnmount() {
    const lat = this.refs.map.getCenter().lat();
    const lng = this.refs.map.getCenter().lng();
    const zoom = this.refs.map.getZoom();
    this.props.dispatch({type: 'SET_DEFAULT_MAPCENTER_AND_MAPZOOM', lat, lng, zoom});
  }


  boundsChanged() {
    const maxLat = this.refs.map.getBounds().getNorthEast().lat();
    const minLat = this.refs.map.getBounds().getSouthWest().lat();
    const maxLng = this.refs.map.getBounds().getNorthEast().lng();
    const minLng = this.refs.map.getBounds().getSouthWest().lng();

    this.props.dispatch(fetchEvents(
      this.props.filter.startDate, this.props.filter.endDate,
      maxLat, minLat, maxLng, minLng));
  }

  handleMarkerClick(id) {
    this.setState({activeIW: id});
  }

  handleMarkerClose() {
    this.setState({activeIW: ''});
  }

  eventDetails(id) {
    window.jQuery('#event-detail').modal('open');
    window.jQuery('#event-detail').scrollTop(0);

    //gets event details from redux store (missing description)
    const event = this.props.filteredEvents.find(e => e._id === id);
    this.props.dispatch({type: 'SET_EVENT', eventDetail: event});

    //gets full event details from db
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
          onClick={this.handleMarkerClick.bind(this, event._id)}>
          {this.state.activeIW === event._id ? this.renderInfoWindow(event): null}
        </Marker> );
    });

    return (
      <div ref="mapListWrapper" id="map-list-wrapper">
        <FilterButton />
        <Filter />
        <MapSettingsLabel
          iw={this.state.activeIW} numMapEvents={this.props.eventsNumCheck.length} numFilteredEvents={this.props.filteredEvents.length}/>
        <GoogleMapLoader
          containerElement={<div id="g-map"></div>}
          googleMapElement={
            <GoogleMap
              // center={mapCenter || this.state.center}
              defaultCenter={this.props.map.defMapCenter}
              defaultZoom={this.props.map.defMapZoom}
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
        <List handleMarkerClick={this.handleMarkerClick} />
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
    map: state.map,
    filter: state.filter,
    view: state.view
  };
};

export default connect(mapStateToProps)(MapView);
