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

//https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-crime-snippet.json

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

var removeMarkers = function(marker_object) {
  _.map(marker_object, function(marker){
    //console.log('Removed Marker', marker._latlng.lat, marker._latlng.lng)
    map.removeLayer(marker);
  });
};

var parseData = function(downloaded_data) {
  console.log('Parsing Data');
  if(typeof downloaded_data !== 'undefined'){
    var parse = JSON.parse(downloaded_data);
    console.log(parse);
    console.log('Parsed');
  }
  return parse;
  //console.log(downloaded_data);
}

//filtering data based on drug crimes (keeping if narcotics/drug related and rape)
var filter_data = function(parseData){
  console.log('Filtering Data');
  var cleaned_data = [];
  _.map(parseData, function(parse){
   // console.log(parse["General Crime Category"]);
    if(parse["General Crime Category"] == 'Narcotic / Drug Law Violations') {
      cleaned_data.push(parse)
      console.log(cleaned_data);
    };  
  });  
  return cleaned_data;
};

var makeMarkers = function(parseData, latitude, longitude) {
  console.log('Making Markers');
  markers = [];
  console.log('Lat Key:',latitude);
  console.log('Long Key:',longitude);
  _.map(parseData, function(parse){
    markers.push(L.circleMarker([parse[latitude], parse[longitude]]));
  });
  //console.log(markers);
  return markers;
};

// Now we need a function that takes this collection of markers
// and puts them on the map
var plotMarkers = function(marker_object) {
  console.log('Plotting Markers');
  _.map(marker_object, function(marker){
    marker.addTo(map);
  });
};

var markers;
button = document.querySelector('button').addEventListener('click', function(event){
    if(markers != null){
      removeMarkers(markers);
    }
    url = document.querySelector('#url-input').value;
    lat = $( "#lat-input" ).val();
    lng = $("#long-input").val();
    // lat = document.querySelector('#lat-input').value;
    // long = document.querySelector('#long-input').value;
    // console.log(url);
    // console.log(lat);
    // console.log(lng);
    if(url==''){
        alert('Nothing Inputted');
    }
    console.log(url);
    var download = $.ajax(url)
    download.done(function(data){
        var parse = parseData(data);
        //console.log(parse);
        markers = makeMarkers(parse, lat, lng); 
        //console.log(markers);
        var plot = plotMarkers(markers);
        return markers;
    });

});
