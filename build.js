(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
var placesJSON = require('./places.json');

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmFzYW5rIiwiYSI6ImRKNlNQa3MifQ.SIx-g-J1oWWlP4grTXopcg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/arunasank/cimk0le3r00cycem3zhj7s8v2', //stylesheet 
    center: [79.0806091,21.1498041], // Center at Nagpur
    zoom: 4 // starting zoom
});

var places = new mapboxgl.GeoJSONSource({
    'type': 'geojson',
    'data': placesJSON,
    'cluster': true,
    'clusterMaxZoom': 14, // Max zoom to cluster points on
    'clusterRadius': 50
});
map.on('style.load', function () {

	map.addSource('places', places);

    map.addLayer({
        'id': 'non-cluster-places',
        'type': 'circle',
        'source': 'places',
        'interactive': true,
        'layout': {
            visibility: 'visible'
        },
        'paint': {
            'circle-radius': 8,
            'circle-color': '#e62749',
            'circle-blur': .9
        }
    });

    var layers = [
        [4, '#F28526'],
        [2, '#F28526'],
        [0, '#F28526']
    ];
    layers.forEach(function (layer, i) {
        map.addLayer({
            'id': 'cluster-' + i,
            'type': 'circle',
            'source': 'places',
            'paint': {
                'circle-color': layer[1],
                'circle-radius': 20,
                'circle-blur': 0.9
            },
            'filter': i === 0 ?
                ['>=', 'point_count', layer[0]] :
                ['all',
                    ['>=', 'point_count', layer[0]],
                    ['<', 'point_count', layers[i - 1][0]]]
        });
    });
    map.addLayer({
        'id': 'cluster-count',
        'type': 'symbol',
        'source': 'places',
        'layout': {
            'text-field': '{point_count}',
            'text-font': [
                'DIN Offc Pro Medium',
                'Arial Unicode MS Bold'
            ],
            'text-size': 12
        }
    });

});



map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, {layers: ['non-cluster-places']});

    if (!features.length) {
        console.log(map.getZoom());
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    if (feature.properties.scientist) {
        console.log(JSON.stringify(feature));
        var popup = new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML(feature.properties.scientist)
            .addTo(map);
    }
    else {
        map.setZoom(6.5);
        map.setCenter(e.lngLat);
        console.log(e.lngLat);
    }
});




},{"./places.json":2}],2:[function(require,module,exports){
module.exports={
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "properties": {
      "scientist": ["Aruna Dhathathreyan"],
      "institute": "Central Leather Research Institute",
      "place": {"Chennai":"city"},
      "author": "Nandita Jayaraj",
      "url": "https://thelifeofscience.com/2016/03/07/aruna/",
      "science": "Biophysics",
      "tags": ""
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
          80.2829533, 
          13.0796914
      ]
    }
  }, {
    "type": "Feature",
    "properties": {
      "scientist": ["Kusala Rajendran"],
      "institute": "Indian Institute of Science, Bangalore",
      "author": "Nandita Jayaraj",
      "url": "https://thelifeofscience.com/2016/02/29/kusala/",
      "place": {"Bangalore":"city"},
      "science": "Geophysics",
      "tags": ""
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        77.5912997,
        12.9791198
      ]
    }
  }, {
    "type": "Feature",
    "properties": {
      "scientist": ["Elizabeth V. Mathew"],
      "institute": "Union Christian College, Aluva",
      "place": {"Aluva":"town"},
      "author": "Nandita Jayaraj",
      "url": "https://thelifeofscience.com/2016/03/28/elizabeth-arachnologist/",
      "science": "Arachnology",
      "tags": ""
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.3525732,
        10.1078869
      ]
    }
  },
  {
  "type": "Feature",
  "properties": {
    "place": {"Kalimpong":"town"},
    "scientist": ["Natasha Gurung", "Husnara Sharma"],
    "institute": "Indian Agricultural Research Institute, Kalimpong, Gorkhaland",
    "url": "https://thelifeofscience.com/2016/03/21/natasha-and-husnara-save-the-mandarins/",
    "author": "Aashima Dogra",
    "science": "Horticulture",
    "tags": ""
    
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      88.4729,
      27.07169
    ]
  }
 },
 {
  "type": "Feature",
  "properties": {
    "place": {"Varanasi":"city"},
    "scientist": ["Kavita Shah"],
    "institute": "Institute of Environmental and Sustainable Development, BHU, Varanasi",
    "url": "https://thelifeofscience.com/2016/04/04/kavita-environmentalbiotech/",
    "author": "Aashima Dogra",
    "science": "Environmental Biotechnology",
    "tags": ""
    
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      82.9887,
      25.3124
    ]
  }
},
{
  "type": "Feature",
  "properties": {
    "place": {"Varanasi":"city"},
    "scientist": ["Nidhi Shah"],
    "institute": "Institute of Environmental and Sustainable Development, BHU, Varanasi",
    "url": "https://thelifeofscience.com/2016/03/14/nidhi/",
    "author": "Aashima Dogra",
    "science": "Climate Change and Disease Research",
    "tags": ""
    
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      82.9888,
      25.3123
    ]
  }
},
{
  "type": "Feature",
  "properties": {
    "place": {"Ajmer":"city"},
    "scientist": ["Monica Bhatnagar"],
    "institute": "Maharishi Dayanand Saraswathi University",
    "author": "Aashima Dogra",
    "science": "Algologist",
    "tags": ""
    
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      74.6394,
      26.4547
    ]
  }
},
{
  "type": "Feature",
  "properties": {
    "place": {"Trivandrum":"city"},
    "scientist": ["Sandhya Sukumaran"],
    "institute": "Central Marine Fisheries Research Institute",
    "author": "Nandita Jayaraj",
    "science": "Marine science",
    "tags": ""
    
  },
  "geometry": {
    "type": "Point",
    "coordinates": [
      76.9574,
      8.5058
    ]
  }
}
]
}
},{}]},{},[1]);
