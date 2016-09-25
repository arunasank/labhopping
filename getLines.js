'use strict';

var turfFc = require('turf-featurecollection');
var turfLine = require('turf-linestring');
var placesJSON = require('./places.json');
var features = [];

placesJSON.features.forEach(function (place, index) {
    if (index < (placesJSON.features.length - 1)) {
        var coordinates = getPoints(30, placesJSON.features[index].geometry.coordinates, placesJSON.features[index + 1].geometry.coordinates);
        var line = turfLine(coordinates);
        features.push(line);
    }
});

var placesLines = turfFc(features);
console.log(JSON.stringify(placesLines));

function getPoints(quantity, a, b) {
    var points = [];
    points.push(a);
    var ydiff = b[1] - a[1], xdiff = b[0] - a[0];
    var slope = (b[1] - a[1]) / (b[0] - a[0]);
    var x, y;

    --quantity;

    for (var i = 0; i < quantity; i++) {
        y = slope === 0 ? 0 : ydiff * (i / quantity);
        x = slope === 0 ? xdiff * (i / quantity) : y / slope;
        points.push([Math.round(x) + a[0], Math.round(y) + a[1]]);
    }

    points.push(b);
    return points;
}
