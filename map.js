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
map.on('style.load', function(){

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
            'circle-radius': 14,
            'circle-color': '#f1f075',
            'circle-blur' : .9
        }
    });

    var layers = [
        [4, '#e62749'],
        [2, '#e62749'],
        [0, '#e62749']
    ];
    layers.forEach(function (layer, i) {
        map.addLayer({
            "id": "cluster-" + i,
            "type": "circle",
            "source": "places",
            "paint": {
                "circle-color": layer[1],
                "circle-radius": 18,
                "circle-blur": 0.9
            },
            "filter": i == 0 ?
                [">=", "point_count", layer[0]] :
                ["all",
                    [">=", "point_count", layer[0]],
                    ["<", "point_count", layers[i - 1][0]]]
        });
    });
    map.addLayer({
        "id": "cluster-count",
        "type": "symbol",
        "source": "places",
        "layout": {
            "text-field": "{point_count}",
            "text-font": [
                    "DIN Offc Pro Medium",
                    "Arial Unicode MS Bold"
                ],
            "text-size": 12
        }
    });

});



map.on('click', function (e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['places'] });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    var popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.scientist)
        .addTo(map);
});



