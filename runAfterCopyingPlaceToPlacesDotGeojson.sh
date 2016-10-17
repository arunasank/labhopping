cp places.geojson places.json
node getLines.js > lines.geojson
cp lines.geojson lines.json
watchify map.js -o build.js
