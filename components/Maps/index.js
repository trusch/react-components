// For this component to work the google maps api is required. Simply add
//    <script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
// in your body

// Props requiered are latitude(lat), longitude(lon) and location

import React, {Component} from 'react';

import './maps.styl';

export default class Map extends Component {
  static propTypes = {
    lat: React.PropTypes.number,
    lon: React.PropTypes.number,
    location: React.PropTypes.string,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.createMap(this.props.location);
  }

  createMap(location) {
    let map, ref = this.refs.map, mapOptions = {
      zoom: 12,
      center: new google.maps.LatLng(this.props.lat, this.props.lon)
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
  
  render() {
    return (
      <div className="map-wrapper">
        <div className='map' ref="map">
        </div>
      </div>
    );
    
  }

}
