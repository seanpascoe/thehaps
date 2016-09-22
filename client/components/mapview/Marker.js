import React from 'react';


class Marker extends React.Component {
  componentDidUpdate(prevProps) {
    if ((this.props.map !== prevProps.map) || (this.props.position !== prevProps.position)) {
      this.renderMarker();
    }
  }

  componentWillUnmount() {
    if (this.marker) {
      this.marker.setMap(null);
    }
  }

  markerHover(p, m, e) {
    console.log('marker clicked!', p, m, e);
  }

  // makeMarkerIcon(markerColor) {
  //   var markerImage = new google.maps.MarkerImage(
  //     'http://chart.googleapis.com/chart?chst=d_map_spin&chld=1.15|0|'+ markerColor +
  //     '|40|_|%E2%80%A2',
  //     new google.maps.Size(21, 34),
  //     new google.maps.Point(0, 0),
  //     new google.maps.Point(10, 34),
  //     new google.maps.Size(21,34));
  //   return markerImage;
  // }

  renderMarker() {

    // creates custom icon on map... to use uncomment makeMarkerIcon(markerColor) function and defaultIcon definition in const pref

    // let defaultIcon = this.makeMarkerIcon('0091ff');

    let category = "soccer";

    let catIcon = `/images/icons/${category}.png`;

    let {map, google, lat, lng} = this.props;
    let position = new google.maps.LatLng(lat, lng);
    const pref = {
      map,
      position,
      icon: catIcon
    };

    //standard marker
    this.marker = new google.maps.Marker(pref);

    // this.marker.addListener('mouseover', (e) => this.markerHover(this.props, this.marker, e));
    this.marker.addListener('click', (e) => this.props.onClick(this.props, this.marker, e))
  }

  render() {
    return null;
  }
}

Marker.propTypes = {
  position: React.PropTypes.object,
  map: React.PropTypes.object
}

export default Marker;
