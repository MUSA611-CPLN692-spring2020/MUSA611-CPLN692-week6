/* =====================
 Copy your code from Week 4 Lab 2 Part 2 part2-app-state.js in this space
===================== */

$('button').click(function() {
  responses = {
    link: $('#text-input1').val(),
    latitude: $('#text-input2').val(),
    longitude: $('#text-input3').val(),
  };

  var downloadData = $.ajax(responses.link).done(parseData);

  var parseData = function(response) {
    var parsed = JSON.parse(response);
    return parsed;
  };

  var makeMarkers = function(points) {
    var markers = [];

    points.forEach(function(point){
        var lat = point[responses.latitude];
        var lon = point[responses.longitude];

        var feature = {type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lon,lat]
            }
        };

        markers.push(feature);
    });

    geoJson = { type: 'FeatureCollection', features: markers };
    return geoJson;
  };

  var plotMarkers = function(markers) {
    L.geoJson(markers).addTo(map);
  };


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


  downloadData.done(function(data) {
    parsed = parseData(data);
    markers = makeMarkers(parsed);
    plotMarkers(markers);
  });


});
