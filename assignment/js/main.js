/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
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
/*
// Use the data source URL from lab 1 in this 'ajax' function:
var downloadData = $.ajax('https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/world-country-capitals.json');

console.log(downloadData);
// Write a function to prepare your data (clean it up, organize it
// as you like, create fields, etc)
var parseData = function(downloadData){

var data = JSON.parse(downloadData);

var markerCordinates = data.map(function(country){
  var coords={
    lat: country.CapitalLatitude,
    long: country.CapitalLongitude
  };
  return coords;
});
return markerCordinates;


};

// Write a function to use your parsed data to create a bunch of
// marker objects (don't plot them!)
var makeMarkers = function(parsedData) {
  var markers=[];

  markers= parsedData.map(function(coords){
    return L.marker([coords.lat,coords.long]);
  });
return markers;
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(markers) {
  markers.forEach(function(marker){
    return marker.addTo(map);
  });

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
/*
var removeMarkers = function(markers) {
  markers.forEach(function(marker){
    return map.removeLayer(marker);
  });

};
/*
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
  zoom: 4
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
/*
downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
  //removeMarkers(markers);
});
*/

$('#text-input1').val('https://raw.githubusercontent.com/CPLN690-MUSA610/datasets/master/json/philadelphia-bike-crashes-snippet.json')
$('#text-input2').val('LAT')
$('#text-input3').val('LNG')

var appState = {
  "markers": undefined,
  "data": undefined,
  "numericField1": undefined,
  "numericField2": undefined,
  "numericFieldx": undefined,
  "numericFieldy": undefined,
  "booleanField": undefined,
  "stringField": undefined,
  "stringField2": undefined,
  "stringField3": undefined
};





$('#b1').click(function(e) {



  appState.stringField = $('#text-input1').val();
  console.log("stringField", appState.stringField);
  appState.stringField2 = $('#text-input2').val();
  console.log("stringField2", appState.stringField2);
  appState.stringField3 = $('#text-input3').val();
  console.log("stringField3", appState.stringField3);

  var downloadData2 = $.ajax(appState.stringField);




  var parseData = function(downloadData2){

  var data = JSON.parse(downloadData2);

  var markerCordinates = data.map(function(country){

    var coords={
      lat: country[appState.stringField2],

      long: country[appState.stringField3]
    };
    return coords;
  });
  return markerCordinates;


  };

  // Write a function to use your parsed data to create a bunch of
  // marker objects (don't plot them!)
  var makeMarkers = function(parsedData) {
    var markers=[];

    markers= parsedData.map(function(coords){
      return L.marker([coords.lat,coords.long]);
    });
  return markers;
  };

  // Now we need a function that takes this collection of markers
  // and puts them on the map
  var plotMarkers = function(markers) {
    markers.forEach(function(marker){
      return marker.addTo(map);
    });

  };






  downloadData2.done(function(data) {
    var parsed = parseData(data);
    var markers = makeMarkers(parsed);
    plotMarkers(markers);
    //removeMarkers(markers);


    // Write a function to prepare your data (clean it up, organize it
    // as you like, create fields, etc)

  });




});
