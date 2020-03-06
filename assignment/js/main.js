/* =====================
  Lab 2, part 2 - application state

  Spatial applications aren't typically as simple as putting data on a map. In
  addition, you'll usually need to change the stored data in response to user
  input. This lab walks you through writing a set of functions that are capable
  of building an interactive application.

  First, we'll need to write a function for loading points onto the map. Choose
  any dataset from part1 and write a function here to download it, parse it,
  make it into markers, and plot it. You'll know you've succeeded when you can
  see markers on the map.

  NOTE 1: When we have added markers to the map in the past, we have used a line like:

       L.marker([50.5, 30.5]).addTo(map);

       This is accomplishing two goals. L.marker([50.5, 30.5]) makes a marker
       and .addTo(map) adds that marker to the map. This task differs in that
       you are being asked to create separate functions: one to create markers
       and one to add them to the map.

  (IMPORTANT!)
  NOTE 2: These functions are being called for you. Look to the bottom of this file
       to see where and how the functions you are defining will be used. Remember
       that function calls (e.g. func();) which are equal to a value (i.e. you
       can set a var to it: var result = func();) must use the 'return' keyword.

       var justOne = function() {
         return 1;
       }
       var one = justOne();
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

// when button clicks, this happens
$("button").click(function () {

  var urltext = $("#text-input1").val();

  // Use the data source URL from lab 1 in this 'ajax' function:
  var downloadData = $.ajax(urltext);

  // Write a function to prepare your data (clean it up, organize it
  // as you like, create fields, etc)
  var parseData = function (data) {
    return JSON.parse(data); };

  // Write a function to use your parsed data to create a bunch of
  // marker objects (don't plot them!)
  var latval, lngval;
  var field2 = $("#text-input2").val();
  var field3 = $("#text-input3").val();
  var makeMarkers = function (data) {
    addmarker = _.map(data, function (x) {
      if(typeof(x[field2]) == 'number') {
        latval = x[field2];
        lngval = x[field3];
      } else {
        latval = Number(x[field2]);
        lngval = Number(x[field3]);
      }
      return L.marker([latval, lngval]);
    });
    return addmarker; };

  // Now we need a function that takes this collection of markers
  // and puts them on the map
  var plotMarkers = function (marker) {
    _.each(marker, function (x){return x.addTo(map); }); };

  // Remove markers
  var removeMarkers = function (marker) {
    return _.map(marker, function (x) {map.removeLayer(x); }); };

  if (typeof(markers) !== "undefined") {
    removeMarkers(markers); }

  downloadData.done(function (data) {
      var parsed = parseData(data);
      var markers = makeMarkers(parsed);
      plotMarkers(markers); });
});
