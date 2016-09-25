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
    var coordinatesArray = new Array();
    // Translate coordinates
    var x1 = a[0];
    var y1 = a[1];
    var x2 = b[0];
    var y2 = b[1];
    // Define differences and error check
    var dx = Math.abs(x2 - x1);
    var dy = Math.abs(y2 - y1);
    var sx = (x1 < x2) ? 1 : -1;
    var sy = (y1 < y2) ? 1 : -1;
    var err = dx - dy;
    // Set first coordinates
    coordinatesArray.push([x1, y1]);
    // Main loop
    while (!((x1 === x2) && (y1 === y2))) {
        var e2 = err << 1;
        if (e2 > -dy) {
            err -= dy;
            x1 += sx;
        }
        if (e2 < dx) {
            err += dx;
            y1 += sy;
        }
        // Set coordinates
        coordinatesArray.push([x1, y1]);
    }
    // Return the result
    return coordinatesArray;
}
