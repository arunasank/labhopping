'use strict';

var turfFc = require('turf-featurecollection');
var turfLine = require('turf-linestring');
var placesJSON = require('./places.json');
var features = [];

placesJSON.features.forEach(function (place, index) {
    if (index < (placesJSON.features.length - 1)) {
        var m = slope(placesJSON.features[index].geometry.coordinates, placesJSON.features[index + 1].geometry.coordinates);
        var b = intercept(placesJSON.features[index].geometry.coordinates, m);
        var coordinates = [];
        for (var x = placesJSON.features[index].geometry.coordinates[0]; x <= placesJSON.features[index + 1].geometry.coordinates[0]; x++) {
            var y = m * x + b;
            coordinates.push([x, y]);
        }
        var line = turfLine(coordinates);
        features.push(line);
    }
});

var placesLines = turfFc(features);
console.log(JSON.stringify(placesLines));

function slope(a, b) {
    if (a[0] === b[0]) {
        return null;
    }

    return (b[1] - a[1]) / (b[0] - a[0]);
}

function intercept(point, slope) {
    if (slope === null) {
        // vertical line
        return point[0];
    }

    return point[1] - slope * point[0];
}
