/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

// Use the data source URL from lab 1 in this 'ajax' function:
$("#urlIn").val("https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-bike-crashes-snippet.json");
$("#LatKey").val("LAT");
$("#LonKey").val("LNG");

var url = $("#urlIn").val();
var latKey = $("#LatKey").val();
var lonKey = $("#LonKey").val();
var downloadData;

// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(data) {
  return JSON.parse(data);
};

// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)
var makeMarkers = function(data) {
  var markers = [];
  for(var i = 0; i<data.length; i++){
    var mark = L.marker([data[i][latKey], data[i][lonKey]]);
    markers.push(mark);
  }
  return markers;
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(marks) {
  for(var i = 0; i< marks.length; i++){
    marks[i].addTo(map);
  }
};

// At this point you should see a bunch of markers on your map if
// things went well.
// Don't continue on until you can make them appear!

/* =====================
  Define the function removeData so that it clears the markers you've written
  from the map. You'll know you've succeeded when the markers that were
  previously displayed are (nearly) immediately removed from the map.

  In Leaflet, the syntax for removing one specific marker looks like this:

  map.removeLayer(marker);

  In real applications, this will typically happen in response to changes to the
  user's input.
===================== */

// Look to the bottom of this file and try to reason about what this
// function should look like
var removeMarkers = function(marks) {
  for(var i = 0; i< marks.length; i++){
    map.removeLayer(marks[i]);
  }
};

/* =====================
  Optional, stretch goal
  Write the necessary code (however you can) to plot a filtered down version of
  the downloaded and parsed data.

  Note: You can add or remove from the code at the bottom of this file
  for the stretch goal.
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
 CODE EXECUTED HERE!
===================== */

$("#button_1").click(function(){
    console.log("success");
    url = $("#urlIn").val();
    latKey = $("#LatKey").val();
    lonKey = $("#LonKey").val();
    downloadData = $.ajax(url);

    downloadData.done(function(data) {
        var parsed = parseData(data);
        var markers = makeMarkers(parsed);
        plotMarkers(markers);
        //removeMarkers(markers);
      });
});


