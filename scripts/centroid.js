//File to convert trainDetails.json -> trainRoutes.geojson
var _ = require('underscore');
var jsonfile = require('jsonfile');
var iisc = jsonfile.readFileSync('iisc.geojson');
var turfCentroid = require('turf-centroid');


iisc = turfCentroid(iisc);

console.log(iisc);