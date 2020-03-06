/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

var parseData = function(dat) {return JSON.parse(dat).map(function(obj){
  var lati = $('#lat_input').val()
  var long = $('#lng_input').val()
  return {'lat':obj[lati],'lng':obj[long]}
})};


var makeMarkers = function(mark) {return _.map(mark,function(eachmark){
  return L.marker([eachmark.lat,eachmark.lng]).addTo(map)
} )};


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


$( "#plot" ).click(function(){
  var connect = $('#url_input').val();
  $.ajax(connect).done(function(data) {
  var parsed = parseData(data);
  console.log(parsed)
  var markers = makeMarkers(parsed);
});});
