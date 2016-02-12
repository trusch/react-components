// For this component to work the google maps api is required. Simply add
//    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
// in your body

// Props requiered are latitude(lat), longitude(lon) and location

import React, {Component} from 'react';

import './map.styl';
import mapStyle from './mapstyle.js';

export default class Map extends Component {
  static propTypes = {
    location: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.location = this.props.location;
  }

  componentDidMount() {
    this.createMap(this.props.location);
    this.location = this.props.location;
  }

  createMap(location) {
    let map, ref = this.refs.map, mapOptions = {
      zoom       : this.props.zoom        || 16,
      draggable  : this.props.draggable   || false,
      scrollwheel: this.props.scrollwheel || false,
      center     : new google.maps.LatLng(this.props.lat, this.props.lon),
      styles     : mapStyle.ultraLightAndFlat
    };

    new google.maps.Geocoder().geocode({address: location}, function(res, status) {
      if(status == 'OK') {
        map = new google.maps.Map(ref, mapOptions);
        map.setCenter(res[0].geometry.location);
        var marker = new google.maps.Marker({
          map: map,
          position: res[0].geometry.location
        });
      }
    });
  }

  componentDidUpdate() {
    if(this.props.updateable && this.location !== this.props.location) {
      this.location = this.props.location;
      this.createMap(this.props.location);
    }
  }
  
  render() {
    return (
      <div className="map-wrapper">
        <div className='map' ref="map">
        </div>
      </div>
    );
  }
}
