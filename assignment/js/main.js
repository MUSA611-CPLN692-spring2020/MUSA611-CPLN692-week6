/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

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
 Set up the form on the page
===================== */
var appState = {
  "Data": undefined,
  "Latitude": undefined,
  "Longitude": undefined,
  "markers": undefined,
};


var setValues = function(){
  $('#text-input1').val('https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-solar-installations.json');
  $('#text-input2').val('Y');
  $('#text-input3').val('X');
 
}

var readInput = function(){
  appState.Data = $('#text-input1').val();
  console.log("data label", appState.Data);
  appState.Latitude = $('#text-input2').val();
  console.log("latitude label", appState.Latitude);
  appState.Longitude = $('#text-input3').val();
  console.log("Longitude label", appState.Longitude);
  
}

var enableInteraction = function(){
  $('#text-input1').prop('disabled', false);
  $('#text-input2').prop('disabled', false);
  $('#text-input3').prop('disabled', false);

}

/* =====================
 Code just to read the url data and plot markers
===================== */
var parseData = function(data) {return parsed=JSON.parse(data)};
var create_marker = function(row){
  var lat=row[appState.Latitude];
  var lng=row[appState.Longitude];
  var marker = L.marker([lat, lng]);
  return marker;
}
var makeMarkers = function(cleanedData) {
  markers = _.map(cleanedData, create_marker);
  return(markers);
}
var plotMarkers = function(markers) {
  _.each(markers, function(x){x.addTo(map)});
}
var removeMarkers = function(markers) {
  _.each(markers, function(m){map.removeLayer(m)})
};

/* =====================
 Button events
===================== */
var buttonClick = function(){
  $('Button').click(function(e) {
  readInput();
  var downloadData = $.ajax(appState.Data);
  downloadData.done(function(data) {
	  var parsed = parseData(data);
	  console.log(parsed);
	  appState.markers = makeMarkers(parsed);
	  plotMarkers(appState.markers);
	});
});
  
}

// var buttonClick = function(){
//   $('Button 1').click(function(e) {
//   readInput();
//   var downloadData = $.ajax(appState.Data);
//   downloadData.done(function(data) {
// 	  var parsed = parseData(data);
// 	  console.log(parsed);
// 	  appState.markers = makeMarkers(parsed);
// 	  plotMarkers(appState.markers);
// 	});
// });
  
// }

// /*CLICK EVENt TO REMOVE MARKERS*/
// var buttonRemove = function(){
// 	$('Button 2').click(function(e){
// 		console.log('remove')
// 		removeMarkers(appState.markers)
// 	});
// }


/* =====================
FUNCTIONS TO BE CALLED ON DOCUMENT
===================== */
$(document).ready(function() {
  setValues();
  readInput();
  enableInteraction();
  buttonClick();  

});