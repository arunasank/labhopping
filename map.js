mapboxgl.accessToken = 'pk.eyJ1IjoiYXJ1bmFzYW5rIiwiYSI6ImRKNlNQa3MifQ.SIx-g-J1oWWlP4grTXopcg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/arunasank/cimk0le3r00cycem3zhj7s8v2', //stylesheet 
    center: [79.0806091,21.1498041], // Center at Nagpur
    zoom: 4 // starting zoom
});

map.on('style.load', function(){

	var collegesSource = $.getJSON("colleges.geojson", function(json) {
    	console.log(json);
	});

    // map.addSource("colleges", {
    //     type: "geojson",
    //     data: collegesSource
    // });

    // map.addLayer({
    //     "id": "colleges",
    //     "type": "symbol",
    //     "source": "colleges",
    //     "layout": {
    //         "icon-image": "marker-15"
    //     }
    // });
});


