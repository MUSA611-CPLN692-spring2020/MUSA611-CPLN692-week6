/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var map = L.map('map', {
  center: [8, 20],
  zoom: 2
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

$(":button").click(function() {

var url_data = $('#text-input1').val();

var downloadData = $.ajax(url_data);

// COUNTRIES
// https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/world-country-capitals.json
// CapitalLatitude
// CapitalLongitude

// BIKE CRASHES
// https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-bike-crashes-snippet.json
// lat_final
// long_final

// CRIME
// https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-crime-snippet.json
// Lat
// Lng

// SOLAR
// https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-solar-installations.json
// LAT
// LONG_

var parsedData = function(data) {
  var each_entry = JSON.parse(data);
  var markerCoordinates = each_entry.map(function(entry) {
  var coords = {
      lat: entry[ $('#text-input2').val()],
      long: entry [$('#text-input3').val()]

};
  return coords;
});
  return markerCoordinates;
};

var makeMarkers = function(parsedData) {
  var markers = [];
  markers = parsedData.map(function(coords){
    return L.marker([coords.lat, coords.long]);
  });
  return markers;
};

var plotMarkers = function(markers) {
  markers.forEach(function(marker){
    return marker.addTo(map);
  });
};

/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
  var parsed = parsedData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
});

});
