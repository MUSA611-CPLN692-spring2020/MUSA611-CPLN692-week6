/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var appState = {
  "URL": undefined,
  "Latitude:": undefined,
  "Longitude:": undefined
};

$('button').click(function(e) {
  appState.URL = $('#URL-input').val();
  console.log("URL:", appState.URL);

  appState.LatitudeKey = $('#latitude-input').val();
  console.log("Latitude Key:", appState.LatitudeKey);

  appState.LongitudeKey = $('#longitude-input').val();
  console.log("Longitude Key:", appState.LongitudeKey);

// Use the data source URL from lab 1 in this 'ajax' function:
var downloadData = $.ajax(appState.URL);

// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(data){return parsed=JSON.parse(data)};

// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)
var createMarkers = function(crash){
  var lat = crash[appState.LatitudeKey];
  var long = crash[appState.LongitudeKey];
  var marker = L.marker([lat,long]);
  return marker;
};

var makeMarkers = function(parsedData) {
  markers = _.map(parsedData, createMarkers);
  return markers;
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(markers) {
  _.map(markers, function(m){m.addTo(map);});
};


/* =====================
 Leaflet setup - feel free to ignore this
===================== */

var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 14
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
});

});
