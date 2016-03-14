module.exports = {
  ultraLightAndFlat: [
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#a0d6d1"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f5f5f5"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#83cead"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#ffffff"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#333333"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#f2f2f2"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#fefefe"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    }
  ],

  flatMapsWithLabels: [
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "hue": "#7fc8ed"
        },
        {
          "saturation": 55
        },
        {
          "lightness": -6
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
        {
          "hue": "#7fc8ed"
        },
        {
          "saturation": 55
        },
        {
          "lightness": -6
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#83cead"
        },
        {
          "saturation": 1
        },
        {
          "lightness": -15
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#f3f4f4"
        },
        {
          "saturation": -84
        },
        {
          "lightness": 59
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "labels",
      "stylers": [
        {
          "hue": "#ffffff"
        },
        {
          "saturation": -100
        },
        {
          "lightness": 100
        },
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#ffffff"
        },
        {
          "saturation": -100
        },
        {
          "lightness": 100
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels",
      "stylers": [
        {
          "hue": "#bbbbbb"
        },
        {
          "saturation": -100
        },
        {
          "lightness": 26
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#ffcc00"
        },
        {
          "saturation": 100
        },
        {
          "lightness": -35
        },
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "hue": "#ffcc00"
        },
        {
          "saturation": 100
        },
        {
          "lightness": -22
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "poi.school",
      "elementType": "all",
      "stylers": [
        {
          "hue": "#d7e4e4"
        },
        {
          "saturation": -60
        },
        {
          "lightness": 23
        },
        {
          "visibility": "on"
        }
      ]
    }
  ],

  nightMode: [
    {
      "featureType": "all",
      "elementType": "all",
      "stylers": [
        {
          "invert_lightness": true
        },
        {
          "saturation": 10
        },
        {
          "lightness": 30
        },
        {
          "gamma": 0.5
        },
        {
          "hue": "#435158"
        }
      ]
    }
  ]
}