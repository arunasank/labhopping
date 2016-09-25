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
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    if (feature.properties.scientist) {
        var popup = new mapboxgl.Popup()
            .setLngLat(feature.geometry.coordinates)
            .setHTML("<a target='_blank' href=" + url + ">"+ feature.properties.scientist +"</a>" )
            .addTo(map);
    }
    else {
        map.setZoom(6.5);
        map.setCenter(e.lngLat);
    }
});




},{"./places.json":2}],2:[function(require,module,exports){
module.exports={
  "type": "FeatureCollection",
  "features": [{
    "type": "Feature",
    "id": "node/3401391999",
    "properties": {
      "@id": "node/3401391999",
      "alt_name": "Bangalore",
      "capital": "4",
      "ele": "920",
      "is_capital": "state",
      "is_in:iso_3166_2": "IN-KA",
      "name": "Bengaluru",
      "name:be": "বেঙ্গালূরু",
      "name:de": "Bangalore",
      "name:en": "Bengaluru",
      "name:hi": "बेंगालुरू",
      "name:ja": "バンガロール",
      "name:kn": "ಬೆಂಗಳೂರು",
      "name:ml": "ബെംഗളൂരു",
      "name:ru": "Бангалор",
      "name:ta": "பெங்களூர்",
      "name:te": "బెంగళూరు",
      "old_name": "Bangalore",
      "place": "city",
      "population": "10839725",
      "postal_code": "560001",
      "wikidata": "Q1355",
      "wikipedia": "en:Bangalore"
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
    "id": "node/3233393892",
    "properties": {
      "@id": "node/3233393892",
      "capital": "4",
      "gns:dsg": "ADM2",
      "gns:uni": "-2919695",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:district": "Chennai",
      "is_in:state": "State of Tamil Nadu",
      "name": "Chennai",
      "name:de": "Chennai",
      "name:en": "Chennai",
      "name:fr": "Chennai",
      "name:hi": "चेन्नई",
      "name:ja": "チェンナイ",
      "name:kn": "ಚೆನ್ನೈ",
      "name:lt": "Čenajus",
      "name:ml": "ചെന്നൈ",
      "name:pl": "Ćennaj",
      "name:ru": "Ченнаи",
      "name:ta": "சென்னை",
      "name:te": "చెన్నై",
      "name:uk": "Ченнаї",
      "old_name": "Madras",
      "place": "city",
      "place:cca": "a1",
      "population": "4681087",
      "postal_code": "600001",
      "source": "GNS;http://en.wikipedia.org/wiki/Chennai",
      "wikipedia": "en:Chennai"
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
    "id": "node/287687798",
    "properties": {
      "@id": "node/287687798",
      "is_in": "India",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:state": "Uttar Pradesh",
      "name": "Varanasi",
      "name:en": "Varanasi",
      "name:hi": "वाराणसी",
      "name:ja": "ワーラーナシー",
      "name:kn": "ವಾರಾಣಸಿ",
      "name:ru": "Варанаси",
      "place": "city",
      "place:cca": "b1",
      "population": "3100000"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        83.0076292,
        25.3356491
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/342097733",
    "properties": {
      "@id": "node/342097733",
      "AND_a_nosr_p": "10011134",
      "name": "Kalimpong",
      "place": "town",
      "population": "10000",
      "postal_code": "734301",
      "source": "AND"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        88.4729,
        27.07169
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/1880437827",
    "properties": {
      "@id": "node/1880437827",
      "is_in": "Ernakulam;Kerala;KL;India;IN",
      "is_in:country": "india",
      "is_in:district": "Ernakulam",
      "is_in:state": "kerala",
      "name": "Aluva",
      "place": "town"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.3525732,
        10.1078869
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/287687798",
    "properties": {
      "@id": "node/287687798",
      "is_in": "India",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:state": "Uttar Pradesh",
      "name": "Varanasi",
      "name:en": "Varanasi",
      "name:hi": "वाराणसी",
      "name:ja": "ワーラーナシー",
      "name:kn": "ವಾರಾಣಸಿ",
      "name:ru": "Варанаси",
      "place": "city",
      "place:cca": "b1",
      "population": "3100000"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        83.0076292,
        25.3356491
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/245748597",
    "properties": {
      "@id": "node/245748597",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:state": "Rajasthan",
      "name": "Ajmer",
      "name:en": "Ajmer",
      "name:gu": "અજમેર",
      "name:hi": "अजमेर",
      "name:ja": "アジュメール",
      "name:kn": "ಅಜ್ಮೇರ್",
      "name:ta": "அஜ்மீர்",
      "name:te": "అజ్మీర్",
      "place": "city",
      "population": "542600",
      "postal_code": "305001"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        74.639,
        26.4691
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/340748436",
    "properties": {
      "@id": "node/340748436",
      "name": "Hassan",
      "name:ja": "ハーサン",
      "name:kn": "ಹಾಸನ",
      "name:kn:iso15919": "Hāsana",
      "place": "town",
      "postal_code": "573201",
      "wikipedia": "en:Hassan,_Karnataka"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.0992703,
        13.0070817
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/287687798",
    "properties": {
      "@id": "node/287687798",
      "is_in": "India",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:state": "Uttar Pradesh",
      "name": "Varanasi",
      "name:en": "Varanasi",
      "name:hi": "वाराणसी",
      "name:ja": "ワーラーナシー",
      "name:kn": "ವಾರಾಣಸಿ",
      "name:ru": "Варанаси",
      "place": "city",
      "place:cca": "b1",
      "population": "3100000"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        83.0076292,
        25.3356491
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/245581432",
    "properties": {
      "@id": "node/245581432",
      "alt_name": "Trivandrum",
      "capital": "4",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "name": "Thiruvananthapuram",
      "name:en": "Thiruvananthapuram",
      "name:hi": "तिरुवनन्तपुरम",
      "name:ja": "ティルヴァナンタプラム",
      "name:kn": "ತಿರುವನಂತಪುರಂ",
      "name:lt": "Thiruvananthapuramas",
      "name:ml": "തിരുവനന്തപുരം",
      "name:ru": "Тируванантапурам",
      "name:ta": "திருவனந்தபுரம",
      "name:uk": "Тируванантапурам",
      "name:zh": "特里凡得琅",
      "place": "city",
      "place:cca": "b2",
      "population": "744983",
      "postal_code": "695001",
      "wikipedia": "en:Thiruvananthapuram"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.9570481,
        8.5058909
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/245581432",
    "properties": {
      "@id": "node/245581432",
      "alt_name": "Trivandrum",
      "capital": "4",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "name": "Thiruvananthapuram",
      "name:en": "Thiruvananthapuram",
      "name:hi": "तिरुवनन्तपुरम",
      "name:ja": "ティルヴァナンタプラム",
      "name:kn": "ತಿರುವನಂತಪುರಂ",
      "name:lt": "Thiruvananthapuramas",
      "name:ml": "തിരുവനന്തപുരം",
      "name:ru": "Тируванантапурам",
      "name:ta": "திருவனந்தபுரம",
      "name:uk": "Тируванантапурам",
      "name:zh": "特里凡得琅",
      "place": "city",
      "place:cca": "b2",
      "population": "744983",
      "postal_code": "695001",
      "wikipedia": "en:Thiruvananthapuram"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.9570481,
        8.5058909
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/1068792671",
    "properties": {
      "@id": "node/1068792671",
      "capital": "5",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:state": "Rajasthan",
      "name": "Bandhar Sindhri (Near Kishangarh)",
      "name:en": "Bandhar Sindhri (Near Kishangarh)",
      "name:hi": "किशानगढ",
      "place": "town",
      "population": "155000",
      "postal_code": "305802",
      "source": "AND"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        74.8603448,
        26.5891537
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/16173235",
    "properties": {
      "@id": "node/16173235",
      "capital": "4",
      "ele": "8",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:iso_3166_2": "IN-MH",
      "is_in:state": "Maharashtra",
      "name": "Mumbai",
      "name:bn": "মুম্বই",
      "name:cs": "Bombaj",
      "name:de": "Mumbai",
      "name:en": "Mumbai",
      "name:eo": "Mumbajo",
      "name:es": "Bombay",
      "name:fr": "Bombay",
      "name:gu": "મુંબઈ",
      "name:hi": "मुंबई",
      "name:ia": "Mumbai",
      "name:io": "Mumbai",
      "name:ja": "ムンバイ",
      "name:jbo": ".mumbais.",
      "name:kn": "ಮುಂಬೈ",
      "name:lt": "Mumbajus",
      "name:ml": "മുംബൈ",
      "name:mr": "मुंबई",
      "name:pl": "Mumbaj",
      "name:ru": "Мумбаи",
      "name:sk": "Bombaj",
      "name:sr": "Мумбај",
      "name:ta": "மும்பை",
      "name:te": "ముంబై",
      "name:uk": "Мумбаї",
      "name:zh": "孟买",
      "old_name": "Bombay",
      "old_name:eo": "Bombajo",
      "old_name:pl": "Bombaj",
      "place": "city",
      "place:cca": "a1",
      "population": "13662885",
      "rank": "0",
      "source": "http://en.wikipedia.org/wiki/Mumbai",
      "wikipedia": "en:Mumbai"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        72.8308337,
        18.9321862
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/125904109",
    "properties": {
      "@id": "node/125904109",
      "alt_name": "Ajitgarh",
      "name": "Mohali",
      "name:ja": "モーハーリー",
      "name:pa": "ਮੋਹਾਲੀ",
      "place": "town",
      "wikidata": "Q1949069",
      "wikipedia": "en:Mohali"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.7138075,
        30.7287676
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/16173235",
    "properties": {
      "@id": "node/16173235",
      "capital": "4",
      "ele": "8",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:iso_3166_2": "IN-MH",
      "is_in:state": "Maharashtra",
      "name": "Mumbai",
      "name:bn": "মুম্বই",
      "name:cs": "Bombaj",
      "name:de": "Mumbai",
      "name:en": "Mumbai",
      "name:eo": "Mumbajo",
      "name:es": "Bombay",
      "name:fr": "Bombay",
      "name:gu": "મુંબઈ",
      "name:hi": "मुंबई",
      "name:ia": "Mumbai",
      "name:io": "Mumbai",
      "name:ja": "ムンバイ",
      "name:jbo": ".mumbais.",
      "name:kn": "ಮುಂಬೈ",
      "name:lt": "Mumbajus",
      "name:ml": "മുംബൈ",
      "name:mr": "मुंबई",
      "name:pl": "Mumbaj",
      "name:ru": "Мумбаи",
      "name:sk": "Bombaj",
      "name:sr": "Мумбај",
      "name:ta": "மும்பை",
      "name:te": "ముంబై",
      "name:uk": "Мумбаї",
      "name:zh": "孟买",
      "old_name": "Bombay",
      "old_name:eo": "Bombajo",
      "old_name:pl": "Bombaj",
      "place": "city",
      "place:cca": "a1",
      "population": "13662885",
      "rank": "0",
      "source": "http://en.wikipedia.org/wiki/Mumbai",
      "wikipedia": "en:Mumbai"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        72.8308337,
        18.9321862
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/1068792671",
    "properties": {
      "@id": "node/1068792671",
      "capital": "5",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:state": "Rajasthan",
      "name": "Bandhar Sindhri (Near Kishangarh)",
      "name:en": "Bandhar Sindhri (Near Kishangarh)",
      "name:hi": "किशानगढ",
      "place": "town",
      "population": "155000",
      "postal_code": "305802",
      "source": "AND"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        74.8603448,
        26.5891537
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/16173235",
    "properties": {
      "@id": "node/16173235",
      "capital": "4",
      "ele": "8",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:iso_3166_2": "IN-MH",
      "is_in:state": "Maharashtra",
      "name": "Mumbai",
      "name:bn": "মুম্বই",
      "name:cs": "Bombaj",
      "name:de": "Mumbai",
      "name:en": "Mumbai",
      "name:eo": "Mumbajo",
      "name:es": "Bombay",
      "name:fr": "Bombay",
      "name:gu": "મુંબઈ",
      "name:hi": "मुंबई",
      "name:ia": "Mumbai",
      "name:io": "Mumbai",
      "name:ja": "ムンバイ",
      "name:jbo": ".mumbais.",
      "name:kn": "ಮುಂಬೈ",
      "name:lt": "Mumbajus",
      "name:ml": "മുംബൈ",
      "name:mr": "मुंबई",
      "name:pl": "Mumbaj",
      "name:ru": "Мумбаи",
      "name:sk": "Bombaj",
      "name:sr": "Мумбај",
      "name:ta": "மும்பை",
      "name:te": "ముంబై",
      "name:uk": "Мумбаї",
      "name:zh": "孟买",
      "old_name": "Bombay",
      "old_name:eo": "Bombajo",
      "old_name:pl": "Bombaj",
      "place": "city",
      "place:cca": "a1",
      "population": "13662885",
      "rank": "0",
      "source": "http://en.wikipedia.org/wiki/Mumbai",
      "wikipedia": "en:Mumbai"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        72.8308337,
        18.9321862
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/245612641",
    "properties": {
      "@id": "node/245612641",
      "alt_name": "Kudla",
      "capital": "5",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "name": "Mangaluru",
      "name:en": "Mangaluru",
      "name:hi": "मैंगलूर",
      "name:ja": "マンガロール",
      "name:kn": "ಮಂಗಳೂರು",
      "name:kn:iso15919": "Maṅgaḷūru",
      "name:lt": "Mangaloras",
      "name:ml": "മംഗളൂരു",
      "name:ru": "Мангалор",
      "name:ta": "மங்களூர்",
      "old_name": "Mangalore",
      "place": "city",
      "place:cca": "b2",
      "population": "500000",
      "postal_code": "575001"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        74.8430082,
        12.8698101
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/16173236",
    "properties": {
      "@id": "node/16173236",
      "capital": "2",
      "capital_ISO3166-1": "yes",
      "is_capital": "country",
      "is_in": "National Capital Region, NCR, India",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:iso_3166_2": "IN-DL",
      "name": "New Delhi",
      "name:ace": "New delhi",
      "name:af": "Nieu-Delhi",
      "name:am": "ኒው ዴሊ",
      "name:an": "Nueva Delhi",
      "name:ang": "Nīƿe Delhi",
      "name:ar": "نيودلهي",
      "name:bat-smg": "Naujasės Delės",
      "name:be": "Нью-Дэлі",
      "name:be-tarask": "Нью-Дэлі",
      "name:bg": "Ню Делхи",
      "name:bn": "নতুন দিল্লি",
      "name:bo": "ནེའུ་དིལ་ལི།",
      "name:bpy": "নুৱা দিল্লী",
      "name:br": "New Delhi",
      "name:bs": "New Delhi",
      "name:ca": "Nova Delhi",
      "name:cbk-zam": "Nueva Delhi",
      "name:ckb": "نیودلھی",
      "name:co": "New Delhi",
      "name:crh": "Nyu Deli",
      "name:cs": "Nové Dillí",
      "name:cy": "Delhi Newydd",
      "name:da": "New Delhi",
      "name:de": "Neu-Delhi",
      "name:diq": "Delhiyo Newe",
      "name:dv": "ނިއުދިއްލީ",
      "name:el": "Νέο Δελχί",
      "name:en": "New Delhi",
      "name:eo": "Nov-Delhio",
      "name:es": "Nueva Delhi",
      "name:et": "New Delhi",
      "name:eu": "New Delhi",
      "name:ext": "Nueva Delhi",
      "name:fa": "دهلی نو",
      "name:fi": "New Delhi",
      "name:fiu-vro": "New Delhi",
      "name:fr": "New Delhi",
      "name:fy": "Nij Delly",
      "name:ga": "Nua-Deilí",
      "name:gd": "New Delhi",
      "name:gl": "Nova Deli - नई दिल्ली",
      "name:gv": "Delhi Noa",
      "name:he": "ניו דלהי",
      "name:hi": "नई दिल्ली",
      "name:hif": "New Delhi",
      "name:hr": "New Delhi",
      "name:ht": "Niou Deli",
      "name:hu": "Újdelhi",
      "name:hy": "Նյու Դելի",
      "name:ia": "Nove Delhi",
      "name:id": "New Delhi",
      "name:io": "Nova-Delhi",
      "name:is": "Nýja Delí",
      "name:it": "Nuova Delhi",
      "name:ja": "ニューデリー",
      "name:jv": "New Delhi",
      "name:ka": "ნიუ-დელი",
      "name:kk": "Нью-Дели",
      "name:kl": "New Delhi",
      "name:kn": "ಹೊಸ ದೆಹಲಿ",
      "name:ko": "뉴델리",
      "name:ks": "نٔو دلھی",
      "name:ku": "Delhiya Nû",
      "name:la": "Dellium Novum",
      "name:lb": "Nei-Delhi",
      "name:lij": "Neuva Delhi",
      "name:lmo": "New Delhi",
      "name:lt": "Naujasis Delis",
      "name:lv": "Ņūdeli",
      "name:mg": "New Delhi",
      "name:mi": "New Delhi",
      "name:mk": "Њу Делхи",
      "name:ml": "ന്യൂ ഡെൽഹി",
      "name:mn": "Шинэ Дели",
      "name:mr": "नवी दिल्ली",
      "name:ms": "New Delhi",
      "name:my": "နယူးဒေလီမြို့",
      "name:mzn": "نو دهلی",
      "name:nah": "Yancuīc Deli",
      "name:ne": "नयाँ दिल्ली",
      "name:nl": "New Delhi",
      "name:nn": "New Delhi",
      "name:no": "New Delhi",
      "name:nov": "Novi Deli",
      "name:oc": "Nòva Delhi",
      "name:os": "Нью-Дели",
      "name:pa": "ਨਵੀਂ ਦਿੱਲੀ",
      "name:pam": "New Delhi",
      "name:pl": "Nowe Delhi",
      "name:pms": "New Delhi",
      "name:pnb": "نئی دلی",
      "name:pt": "Nova Deli",
      "name:qu": "Musuq Dilhi",
      "name:ro": "New Delhi",
      "name:ru": "Нью-Дели",
      "name:sa": "नवदेहली",
      "name:sah": "Саҥа Дели",
      "name:scn": "Nova Delhi",
      "name:sco": "New Delhi",
      "name:si": "නව දිල්ලිය",
      "name:simple": "New Delhi",
      "name:sk": "Naí Dillí",
      "name:sl": "New Delhi",
      "name:so": "New Delhi",
      "name:sq": "New Delhi",
      "name:sr": "Њу Делхи",
      "name:sv": "New Delhi",
      "name:sw": "New Delhi",
      "name:ta": "புது தில்லி",
      "name:te": "క్రొత్త ఢిల్లీ",
      "name:tg": "Ню-Дели",
      "name:th": "นิวเดลี",
      "name:tl": "Bagong Delhi",
      "name:tr": "Yeni Delhi",
      "name:ug": "Yéngi Déhli",
      "name:uk": "Нью-Делі",
      "name:ur": "نئی دہلی",
      "name:vi": "Tân Delhi",
      "name:war": "New Delhi",
      "name:yi": "ניי דעלי",
      "name:yo": "New Delhi",
      "name:zh": "新德里",
      "name:zh-min-nan": "Sin Delhi",
      "name:zh-yue": "新德里",
      "place": "city",
      "population": "249998",
      "population:date": "2011",
      "wikipedia": "en:New Delhi"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        77.2159562,
        28.6138967
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/16173235",
    "properties": {
      "@id": "node/16173235",
      "capital": "4",
      "ele": "8",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:iso_3166_2": "IN-MH",
      "is_in:state": "Maharashtra",
      "name": "Mumbai",
      "name:bn": "মুম্বই",
      "name:cs": "Bombaj",
      "name:de": "Mumbai",
      "name:en": "Mumbai",
      "name:eo": "Mumbajo",
      "name:es": "Bombay",
      "name:fr": "Bombay",
      "name:gu": "મુંબઈ",
      "name:hi": "मुंबई",
      "name:ia": "Mumbai",
      "name:io": "Mumbai",
      "name:ja": "ムンバイ",
      "name:jbo": ".mumbais.",
      "name:kn": "ಮುಂಬೈ",
      "name:lt": "Mumbajus",
      "name:ml": "മുംബൈ",
      "name:mr": "मुंबई",
      "name:pl": "Mumbaj",
      "name:ru": "Мумбаи",
      "name:sk": "Bombaj",
      "name:sr": "Мумбај",
      "name:ta": "மும்பை",
      "name:te": "ముంబై",
      "name:uk": "Мумбаї",
      "name:zh": "孟买",
      "old_name": "Bombay",
      "old_name:eo": "Bombajo",
      "old_name:pl": "Bombaj",
      "place": "city",
      "place:cca": "a1",
      "population": "13662885",
      "rank": "0",
      "source": "http://en.wikipedia.org/wiki/Mumbai",
      "wikipedia": "en:Mumbai"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        72.8308337,
        18.9321862
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/16174445",
    "properties": {
      "@id": "node/16174445",
      "capital": "5",
      "is_in": "India",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "name": "Pune",
      "name:eo": "Puneo",
      "name:gu": "પુના",
      "name:hi": "पुणे",
      "name:ja": "プネー",
      "name:kn": "ಪುಣೆ",
      "name:lt": "Puna",
      "name:ml": "പൂണെ",
      "name:mr": "पुणे",
      "name:pl": "Pune",
      "name:ru": "Пуна",
      "name:ta": "புனே",
      "name:te": "పూణే",
      "old_name:en": "Poona",
      "place": "city",
      "place:cca": "a",
      "population": "3115431",
      "postal_code": "411 001",
      "source": "http://en.wikipedia.org/wiki/Pune"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        73.8543185,
        18.5203062
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/1998361311",
    "properties": {
      "@id": "node/1998361311",
      "alt_name": "Cochin",
      "name": "Kochi",
      "name:en": "Kochi",
      "name:hi": "कोच्चि",
      "name:ja": "コーチ",
      "name:kn": "ಕೊಚ್ಚಿ",
      "name:ml": "കൊച്ചി",
      "name:ru": "Коччи",
      "name:ta": "கொச்சி",
      "name:uk": "Кочі",
      "name:zh": "科钦",
      "place": "city",
      "source": "Bing",
      "wikipedia": "en:Kochi"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.2536614,
        9.9633864
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/2360610107",
    "properties": {
      "@id": "node/2360610107",
      "int_name": "Solan",
      "is_in": "Himachal Pradesh, India",
      "name": "Solan",
      "name:en": "Solan",
      "name:pa": "সোলান",
      "place": "town"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        77.1023645,
        30.9077569
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/872403894",
    "properties": {
      "@id": "node/872403894",
      "name": "Suratkal",
      "name:kn": "ಸುರತ್ಕಲ್",
      "name:kn:iso15919": "Suratkal",
      "place": "town",
      "postal_code": "575014"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        74.8046595,
        12.9830998
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/1882920874",
    "properties": {
      "@id": "node/1882920874",
      "is_in:country": "India",
      "name": "Bassa (near Mandi)",
      "place": "town",
      "population": "100000",
      "wikipedia": "en:Mandi,_Himachal_Pradesh"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        76.9293782,
        31.7084496
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/245612641",
    "properties": {
      "@id": "node/245612641",
      "alt_name": "Kudla",
      "capital": "5",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "name": "Mangaluru",
      "name:en": "Mangaluru",
      "name:hi": "मैंगलूर",
      "name:ja": "マンガロール",
      "name:kn": "ಮಂಗಳೂರು",
      "name:kn:iso15919": "Maṅgaḷūru",
      "name:lt": "Mangaloras",
      "name:ml": "മംഗളൂരു",
      "name:ru": "Мангалор",
      "name:ta": "மங்களூர்",
      "old_name": "Mangalore",
      "place": "city",
      "place:cca": "b2",
      "population": "500000",
      "postal_code": "575001"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        74.8430082,
        12.8698101
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/16174445",
    "properties": {
      "@id": "node/16174445",
      "capital": "5",
      "is_in": "India",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "name": "Pune",
      "name:eo": "Puneo",
      "name:gu": "પુના",
      "name:hi": "पुणे",
      "name:ja": "プネー",
      "name:kn": "ಪುಣೆ",
      "name:lt": "Puna",
      "name:ml": "പൂണെ",
      "name:mr": "पुणे",
      "name:pl": "Pune",
      "name:ru": "Пуна",
      "name:ta": "புனே",
      "name:te": "పూణే",
      "old_name:en": "Poona",
      "place": "city",
      "place:cca": "a",
      "population": "3115431",
      "postal_code": "411 001",
      "source": "http://en.wikipedia.org/wiki/Pune"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        73.8543185,
        18.5203062
      ]
    }
  }, {
    "type": "Feature",
    "id": "node/3233393892",
    "properties": {
      "@id": "node/3233393892",
      "capital": "4",
      "gns:dsg": "ADM2",
      "gns:uni": "-2919695",
      "is_capital": "state",
      "is_in:continent": "Asia",
      "is_in:country": "India",
      "is_in:country_code": "IN",
      "is_in:district": "Chennai",
      "is_in:state": "State of Tamil Nadu",
      "name": "Chennai",
      "name:de": "Chennai",
      "name:en": "Chennai",
      "name:fr": "Chennai",
      "name:hi": "चेन्नई",
      "name:ja": "チェンナイ",
      "name:kn": "ಚೆನ್ನೈ",
      "name:lt": "Čenajus",
      "name:ml": "ചെന്നൈ",
      "name:pl": "Ćennaj",
      "name:ru": "Ченнаи",
      "name:ta": "சென்னை",
      "name:te": "చెన్నై",
      "name:uk": "Ченнаї",
      "old_name": "Madras",
      "place": "city",
      "place:cca": "a1",
      "population": "4681087",
      "postal_code": "600001",
      "source": "GNS;http://en.wikipedia.org/wiki/Chennai",
      "wikipedia": "en:Chennai"
    },
    "geometry": {
      "type": "Point",
      "coordinates": [
        80.2829533,
        13.0796914
      ]
    }
  }]
}
},{}]},{},[1]);
