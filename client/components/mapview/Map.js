import React from 'react';
import ReactDOM from 'react-dom';
import mapstyle from './mapstyle';
import Marker from './Marker';
import InfoWindow from './InfoWindow';
import { connect } from 'react-redux';

const camelize = function(str) {
  return str.split(' ').map(function(word){
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join('');
}

class Map extends React.Component {
  constructor(props) {
    super(props)
    const {lat, lng} = this.props.initialCenter;
    this.state = {
      userLocation: {lat, lng},
      mapCenter: {},
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.google !== this.props.google) {
      console.log("componentDidUpdate if statement in map.js ran!!!!!! find out what caused it!!");
      this.loadMap();
    }

    // if (prevState.userLocation !== this.state.userLocation) {
    //   this.recenterMap();
    //   this.setMapCenter(this.map);
    // }
  }

  // trying to get map to not reload
  // componentWillMount() {
  //   if(this.props.map.googleMap) {
  //     this.map = this.props.map.googleMap;
  //   }
  // }

  componentDidMount() {
    if (this.props.centerAroundCurrentLocation && !this.props.map.userLocation) {
      if (navigator && navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const coords = pos.coords;

          let lat = coords.latitude;
          let lng = coords.longitude;

          this.setState({
            userLocation: {
              lat: coords.latitude,
              lng: coords.longitude
            }
          });

          this.props.dispatch({type: 'SET_USERLOCATION', lat, lng});

          this.map.panTo(this.state.userLocation);
          this.setMapCenter(this.map);

        });
      }
    }
    //trying to prevent map reload
    // if(!this.props.map.googleMap) {
      this.loadMap();

  }

  setMapCenter(map) {
    let location = map.getCenter();
    let lat = location.lat();
    let lng = location.lng();
    this.setState({ mapCenter: {lat, lng} });

    this.props.dispatch({type: 'SET_MAPCENTER', lat, lng});
  }

  loadMap() {
    if (this.props && this.props.google) {
      // google is available
      const {google} = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;

      const {lat, lng} = this.props.map.mapCenter || this.state.userLocation;

      const center = new maps.LatLng(lat, lng);
      const mapConfig = Object.assign({}, {
        center: center,
        zoom: zoom,
        styles: mapstyle.styles,
        mapTypeControl: false,
        streetViewControl: false
      });
      this.map = new maps.Map(node, mapConfig);

      //trying to not reload gmap
      // this.setState({mapViewMap: this.map});

      // this.map.addListener('dragend', () => this.setMapCenter(this.map));

      const evtNames = ['click', 'rightclick', 'dragend'];
      evtNames.forEach(e => {
        this.map.addListener(e, this.handleEvent(e));
      });
      evtNames.forEach(e => Map.propTypes[camelize(e)] = React.PropTypes.func);
    }

    //add this.map to redux store???
    // let googleMap = this.map;
    // this.props.dispatch({type: 'ADD_MAP_TO_STORE', googleMap});
  }

  handleEvent(evtName) {
    const handlerName = `on${camelize(evtName)}`;

    if (evtName === 'dragend') {
      let timeout;
      return (e) => {
        if (timeout) {
          clearTimeout(timeout);
          timeout = null;
        }
        timeout = setTimeout(() => {
          this.setMapCenter(this.map);
          // if (this.props[handlerName]) {
          //   this.props[handlerName](this.props, this.map, e);
          // }
        }, 1000);
      };
    } else {
      return (e) => this.props[handlerName](this.props, this.map, e);
    }
  }

  // recenterMap() {
  //   const map = this.map;
  //   const curr = this.state.userLocation;
  //
  //   const google = this.props.google;
  //   const maps = google.maps;
  //
  //   if (map) {
  //     let center = new maps.LatLng(curr.lat, curr.lng)
  //     map.panTo(center)
  //   }
  // }

  renderChildren() {
    const {children} = this.props;
    debugger;
    if (!children) return;
    return React.Children.map(children, c => {
      return React.cloneElement(c, {
        map: this.map,
        google: this.props.google
      });
    });
  }

  render() {
    let myMarkers = this.props.events.map(event => (
      <Marker map={this.map} google={this.props.google} key={event._id} id={event._id} onClick={this.onMarkerClick} name={event.title} lat={parseFloat(event.lat)} lng={parseFloat(event.lng)} />
    ));
    return (
      <div id="g-map" ref='map' style={{height: '100%', width: '100%', position: 'absolute'}}>
        Loading map...
        {/* {this.renderChildren()} */}
        {myMarkers}
        {/* <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onInfoWindowClose}>
          <div>
            <p>{this.state.selectedEvent.name}</p>
            <p>Lat: {this.state.selectedEvent.lat}</p>
            <p>Lat: {this.state.selectedEvent.lng}</p>
          </div>
        </InfoWindow> */}
      </div>
    );
  }
}

Map.propTypes = {
  google: React.PropTypes.object,
  zoom: React.PropTypes.number,
  initialCenter: React.PropTypes.object,
  onMove: React.PropTypes.func
};

Map.defaultProps = {
  zoom: 11,
  initialCenter: {
    lat: 40.6142948,
    lng: -111.8962744
  },
  centerAroundCurrentLocation: true,
  // onClick: function() {
  //   console.log("click, bitch!")
  // },
  onRightclick: function() {
    console.log('right-click, bitch!')
  }
};

const mapStateToProps = (state) => {
  return { map: state.map, events: state.events };
};

export default connect(mapStateToProps)(Map);
