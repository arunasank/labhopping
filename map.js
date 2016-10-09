'use strict';
var placesJSON = require('./places.json');
var linesJSON = require('./lines.json');

mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmFzYW5rIiwiYSI6ImRKNlNQa3MifQ.SIx-g-J1oWWlP4grTXopcg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //stylesheet
    center: [79.0806091,21.1498041], // Center at Nagpur
    zoom: 4 // starting zoom
});


map.on('style.load', function () {
    mapboxgl.addClaimedBoundaries(map, 'IN');
    map.addSource('places', {
        'type': 'geojson',
        'data': placesJSON,
        'cluster': true,
        'clusterMaxZoom': 14, // Max zoom to cluster points on
        'clusterRadius': 50
    });
    map.addSource('lines', {
        'type': 'geojson',
        'data': linesJSON
    });

    map.addLayer({
        'id': 'lines-between-places',
        'type': 'line',
        'source': 'lines',
        'interactive': true,
        'layout': {
            'visibility': 'visible',
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-width': 1.25,
            'line-color': '#1c84ef'
        }
    });

    map.addLayer({
        'id': 'non-cluster-places',
        'type': 'circle',
        'source': 'places',
        'interactive': true,
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 8,
            'circle-color': '#24ff85',
            'circle-blur': .9
        }
    });
    var layers = [
        [4, '#21d6ff'],
        [2, '#21d6ff'],
        [0, '#21d6ff']
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
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    if (feature.properties.scientist) {
        var popup = new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML('<a target="_blank" href=' + url + '>' + feature.properties.scientist + '</a>')
            .addTo(map);
    } else {
        map.setZoom(6.5);
        map.setCenter(e.lngLat);
    }
});



