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

var layerGroup = L.layerGroup().addTo(map);

/* =====================
 CODE EXECUTED HERE!
===================== */

$(document).ready(function() {
  $("#text-input1").val("https://raw.githubusercontent.com/MUSA611-CPLN692-spring2020/datasets/master/json/philadelphia-bike-crashes-snippet.json");
  $("#text-input2").val('lat_final');
  $("#text-input3").val('long_final');
  $("#text-input1").prop('disabled', false);
  $("#text-input2").prop('disabled', false);
  $("#text-input3").prop('disabled', false);

  $( "Button" ).click(function() {
    layerGroup.clearLayers();
    var removeMarkers = function(markers) {
      _.each(markers, function(marker) {
        map.removeLayer(marker);
      myMarkers = {};
      });
    };

    responses = {
     'Url': $("#text-input1").val(),
     'Lat': $("#text-input2").val(),
     'Long': $("#text-input3").val()
   };

  var downloadData = $.ajax(responses.Url);
  var parseData = function(downloadData) {
    return JSON.parse(downloadData);
  };
  var makeMarkers = function(parsed) {
    return  _.map(parsed, function(incident) {
      return L.marker([incident[responses.Lat], incident[responses.Long]]);
}
);
  };
  var plotMarkers = function(markers) {
    _.each(markers, function(marker) {
      marker.addTo(layerGroup);
    });
  };

  downloadData.done(function(data) {
    var parsed = parseData(data);
    plotMarkers(makeMarkers(parsed));
  });
  });

});
