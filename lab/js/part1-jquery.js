/* =====================
  Set up our map
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
  Lab - jQuery

  In this course, we've set our focus on HTML, CSS, & Javascript as they are useful in the construction
  of mapping applications. One thing that isn't yet clear is how to handle user input. This is difficult
  because we've got to expand our thinking to include HTML, javascript, and their interactions - the
  fields with which a user can interact are specified in HTML <input> elements. We've already seen
  how CSS solves the HTML reference problem (with the use of selectors) and can extend that syntax
  into our work with javascript.

  A few reminders about the basic forms of CSS selector:
  1. The simplest selector case is specification of an element's name directly. The selector "p" will grab all
     <p> elements whereas "h1" will grab all <h1> elements.

  2. An HTML element's "class" is referenced through a prefixed period. A page that has multiple movie
     div elements in which there is a title header might look like this:
     <div>
       <h4 class="movie-title"></h4>
       <div class="movie-detail"></div>
     </div>
     On this page, the selector ".movie-title" can be used to grab all of the elements with a
     "movie-title" class.

  3. An HTML element's "id" is referenced with a hashtag. The selector "#winning" will grab the element
     (element is singular here - an ID should always be unique to the DOM it sits on) where
     <element id="winning">.
     For example:
     <div>
       <p id="winning">Charlie Sheen</p>
     </div>
     On this simple DOM, "#winning" is the id of the <p> element containing "Charlie Sheen".

  4. CSS selectors can be combined to refine our meaning. In the movie-title example above, we can
     find all and only h4 elements with the class "movie-title" with the selector "h4.movie-title"
     which is, translated to english, "h4 elements with the class 'movie-title'".

  In jQuery, we use this syntax as well. It looks like this: $(*selector*); We could, for instance,
  grab all h4 movie-titles with $('h4.movie-title');

  A NOTE ON jQuery.val vs jQuery.text:
    Some of the exercises in this lab involve reading and writing to HTML inputs with the
    help of jQuery selectors and associated methods for querying the DOM. Two methods you'll use again
    and again in this lab are jQuery's `val` and `text`. It is important that you keep in mind that
    they do very different things.

    jQuery().val():
      With no arguments, `val` queries an input value. Provided a value as an argument, it will
      actually set that value in the <input> element.

      For example:
        Reading: $(someSelector).val();  // This gets the current value
        Writing: $(someSelector).val(valueToSet);  // This sets the value

    jQuery().text();
      With no arguments, `val` queries an html element for its contained text (not usable to get an
      input's value!). Provided a string as an argument, it will actually set that string as the html
      element's new text.

      For example:
        Reading: $(someSelector).text();  // This gets the current value
        Writing: $(someSelector).text(textToSet);  // This sets the value


  Task 1: Using javascript, change the HTML to create useful labels for our UI
    *NOTE*: Do not edit part1-jquery.html. You should be able to change the text of an HTML element
            with jQuery alone! Try this: $(<selector>).text('text to set');

    Let's change the labels of our input elements so that they're meaningful. We don't want the
    page to say 'This is the first text input'. Instead we should imagine useful inputs and label
    accordingly. Be sure that the labels you choose make sense for the element types provided. A
    checkbox has only two states: on and off. This is useful for boolean values (e.g. isDoctor,
    hasHair). Text fields allow for more complex representations (e.g. name, address). Numeric fields
    are specialized to only allow numeric values (possible interpretations include: ageInYears, pointsScored).
    The color field is specialized to use HTML5 colorpickers provided by each browser and store data
    as a string in hexadecimal color format (i.e. '#ffffff'); suitable representations include e.g.
    hairColor, markerColor.

    Try to imagine a single object that you're describing. For example, if your object is "person",
    you might want to include a name, an address, an age, a couple of boolean characteristics, and a
    favorite color. Don't spend too much time on thinking about the perfect object to represent with
    this form, just about anything will do.

  Task 2: Setting (writing) input values
    *NOTE*: An input's value is not the same as an HTML element's text. We use $(selector).val() as
            opposed to $(selector).text() in this case.

    Fill out the input form with some imagined values. If you chose to make the form about the
    properties of people, the name might be 'bob' and the favorite color could be green (hint: you'll
    want to get formatting exactly right to set a color field; experiment in the console to see what
    the color you'll specify should look like).

  Task 3: Getting (reading) input values
    Write the code necessary to read from your input form and return a javascript object (with keys
    to clarify the meaning of each value) that has all the data that's stored in your form.

  Task 4: Enable user interaction with the form
    At this point, we're really only using HTML input fields as a kind of storage. We create some data,
    put that data on the DOM, and read it back out. What we really want to do is interact with the
    form we've created as part of a GUI (Graphical User Interface - pronounced like 'gooey'). To do
    this, we can use another jQuery method: 'prop'.

    Here's a simple, disabled input field:
    <input id="someInput" type="number" disabled>

    You can see in this HTML that the input field is disabled. You could also see this by querying
    that property's value through jQuery:
    $('#someInput').prop('disabled');

    Setting the property's value is just slightly more involved:
    $('#someInput').prop('disabled', false); -> <input id="someInput" type="number">
    $('#someInput').prop('disabled', true);  -> <input id="someInput" type="number" disabled>

    Enable *all* fields on this form.

  Task 5: Add a button trigger to log this form's object to console
    We now can enter data through the HTML and create an object to represent that data. Add a button
    click event to the button at the bottom of your form. This means that we want to use jQuery to
    bind your input-reading function (what you did in task 3) to the button's 'click' event.
    Here's the documentation for click: https://api.jquery.com/click/

    Keep in mind that events are asynchronous, just like ajax. The function you bind is not called
    until the event on which it is bound is triggered.

    P.S. Checkboxes might confuse you. Try to use google to figure out what's going wrong.

  Task 6: Plot input data to the map on button click
    Modify this form to include at least a lat (number), long (number), description (text), and
    color (color) inputs. With these inputs you should be able to plot a circle marker
    (http://leafletjs.com/reference.html#circlemarker) to the lat/long on the form, with the color
    provided, and a bound popup which gives you the description.

  // STRETCH GOALS
  Task 7: Use default values - OPTIONAL
    We don't want the application to crash if our user fails to enter values for every field. Add
    whatever logic is necessary to set default values if a field is empty.

  Task 8: Try Leaflet's divIcon
    Instead of using a default leaflet marker or a circleMarker, try using a L.divIcon. A div icon
    is just an HTML <div> element on which CSS can be applied (HINT: background-color or
    background-image are necessary if you want to see the icon). When you've successfully implemented
    a divIcon, you should be able to grab it by reference to its class: 'leaflet-marker-icon'. So,
    in jQuery, $('.leaflet-marker-icon').

  Task 9: Make a parametric function (one that accepts parameters/arguments) to fill the form out.
    At this point, we have an object which corresponds to a (at least partially) filled out form.
    That being so, we should be able to write a function that accepts, as an argument,
    one of those objects and properly fills out the form to match the values of that object. Try to
    update the code below so that an object entered into your form-filling function is stored on the
    HTML and fully reconstituted by the code you've written to read from the form.

    Use `_.isEqual` to make sure the object you feed in is the same as the one you read back out.
===================== */

// Take note of our use of jQuery here: $(document).ready(functionToCallWhenReady)
// This is a popular pattern that you'll run into in programs that run jQuery. It says not to run
// the function passed to `ready` until the HTML document is fully loaded and all scripts have
// been interpreted. It is, therefore, an example of asynchronous behavior.

// Global Variables
// define global variables , store using a dictionary 
var appState = {
  "Name": undefined,
  "Country": undefined,
  "Address": undefined,
  "Age": undefined,
  "IsStudent": undefined,
  "IsDesign": undefined, 
  "FavColor" : undefined
};

// Task 1 
var updateLabels = function(){
  $('#main-heading').text('Plot a point!');
  $('#text-label1').text('Name');
  $('#number-label').text('Lat');
  $('#number-label2').text('Lng');
  $('#text-label2').text('description');
  $('#checkbox-label1').text('Student?');
  $('#checkbox-label2').text('Design Student?');
  $('#color-label').text('Favourite Color');
  $('button').text('Search')
}

// Task 2 
var setValues = function(){
  $('#text-input1').val('Leanne');
  $('#numeric-input').val(39.956024);
  $('#numeric-input2').val(-75.195462);
  $('#text-input2').val('Description of Point');
  $("#cbox-input1").prop("checked", true);
  $("#cbox-input2").prop("checked", true);
  $('#color-input').val('#00FFFF');  //note have to use rrggbb
}

// Task 3
var readInput = function(){
  appState.Name = $('#text-input1').val();
  console.log("Name", appState.Name);
  appState.Lat = $('#numeric-input').val();
  console.log("Lat", appState.Lat);
  appState.Lng = $('#numeric-input2').val();
  console.log("Lng", appState.Lng);
  appState.description = $('#text-input2').val();
  console.log("description", appState.description);

  appState.IsStudent = $('#cbox-input1')[0].checked;
  console.log("Is student", appState.IsStudent);
  appState.IsDesign = $('#cbox-input2')[0].checked;
  console.log("Is design", appState.IsDesign);

  appState.FavColor = $('#color-input').val();
  console.log("Fav Color", appState.FavColor);
}

// Task 4
var enableInteraction = function(){
  $('#text-input1').prop('disabled', false);
  $('#numeric-input').prop('disabled', false);
  $('#numeric-input2').prop('disabled', false);
  $('#text-input2').prop('disabled', false);

  $('#cbox-input1').prop('disabled', false);
  $('#cbox-input2').prop('disabled', false);

  $('#color-input').prop('disabled', false);
}


// Task 6 plot on map
var plotMarker = function(){
  var pathOpts = {'radius': 10,
                  'fillColor': appState.FavColor};
  L.circleMarker([appState.Lat, appState.Lng], pathOpts)
      .bindPopup(appState.description)
      .addTo(map);
}

// Task 5
var buttonClick = function(){
  $('button').click(function(e) {
  readInput();
  plotMarker();});
  
}


$(document).ready(function() {
  updateLabels();
  setValues();
  readInput();
  enableInteraction();
  buttonClick();  

});
