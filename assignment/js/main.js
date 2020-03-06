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
var downloadData = $.ajax("https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-crime-snippet.json");
// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(unparsedat) {
  return JSON.parse(unparsedat)
};

// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)

var makeMarkers = function(parsedat){
  return _.map(parsedat,function(e){return L.marker([e[$('#lat-text').val()],e[$('#long-text').val()]])})
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(plot){return _.each(plot,function(s){s.addTo(map)})} //only see one
// At this point you should see a bunch of markers on your map if
// things went well.
// Don't continue on until you can make them appear!


/*
var removeMarkers = function(points) {
  _.each(points,function(point){
    map.removeLayer(point)
  })
};
*/


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



$(document).ready(function() {
  $('button').click(function(e){
    var downloadData=$.ajax($('#url-text').val())
    downloadData.done(function(data) {
      var parsed = parseData(data);
      plotMarkers(makeMarkers(parsed));
    });
  })
});
