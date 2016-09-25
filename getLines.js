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
    var coordinatesArray = [];
    var xDiff  = (b[0] - a[0]) / quantity;
    var yDiff  = (b[1] - a[1]) / quantity;

    for (var i = 0; i <= quantity; i++) {
        coordinatesArray.push([a[0] + xDiff * i, a[1] + yDiff * i]);
    }

    return coordinatesArray;
}
