// Set up base map
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 12
});
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


// parse our data
var parseData = function(data) {
  var parsed = JSON.parse(data);
  return parsed;
};

// Make marker objects
var makeMarkers = function(data) {
  var marks = _.map(data, function(arr){
    var pathOpts = {'radius': Math.log(arr[value]) * 5, 
                'fillColor': '#00F090'}  
    var circle = L.circleMarker([arr[lon], arr[lat]], pathOpts);
    return circle;
  });
  return marks;
};

// Add markers to our map
var plotMarkers = function(marks) {
  _.map(marks, function(circle){
    circle.addTo(map);
  })
};

// Clear out the current markers
var removeMarkers = function() {
    _.map(markers, function(circle){
    map.removeLayer(circle);
  })
};


// Plot the data based on input value
var plotData = function() {
  var raw = $.ajax(url);
  raw.done(function(data){
    var parsedata = parseData(data);
    markers = makeMarkers(parsedata);
    plotMarkers(markers);
  })
};


// Initial the markers when loading the map for the first time
var markers = [L.circleMarker([39.9522, -75.1639],{'radius': 5, 
                'fillColor': '#00F090'}).addTo(map)];

// Execute our code on click the button
$('button#my-button').click(function(e) {
  url = $('#url').val();
  console.log("data source:", url);

  lat = $('#lat').val();
  console.log("latitude key:", lat);

  lon = $('#lon').val();
  console.log("longitude key:", lon);

  // Input a value field that will affect the size of the circle
  value = $('#value').val();
  console.log("value field:", value);
  
  removeMarkers();
  plotData();
});

