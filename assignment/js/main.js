/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */
var input_form = function(url,lat,long){
  return {
    'URL':url,
    'LNG':long,
    'LAT':lat
  };
};

var user_object = input_form($('#text-input1').val(),$('#text-input2').val(),$('#text-input3').val())

$("#Button_Click").click(function(){
  var downloadData = $.ajax(user_object['URL'])
  var parseData = function(x) {
      return object = JSON.parse(x).map(function(x){
        return {'lat':x[$('#text-input3').val()],'lng':x[$('#text-input2').val()]};
      });
  };
  var makeMarkers = function(a){
    return _.map(a,function(x){return L.marker(Object.values(x))});
  };
  var plotMarkers = function(x) {
     return _.map(x,function(a){return a.addTo(map)});
  };

downloadData.done(function(data) {
  var parsed = parseData(data);
  var markers = makeMarkers(parsed);
  plotMarkers(markers);
});
})




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

//var removeMarkers = function(x) {
  //return _.map(x,function(a){map.removeLayer(a)})
//};



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
