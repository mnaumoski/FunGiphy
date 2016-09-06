//array of animals - these need to be buttons
var animals = ['turtle', 'cheeta', 'hampster', 'lion', 'gecko', 'cat', 'dog'];

function displayAnimal() {

    $("#animalsView").empty();

    var animal = $(this).data("name");
  //  // var key = "dc6zaTOxFJmzC";
  //  //this the var that is used for the ajax call to giphy
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
    url: queryURL,
    method: 'GET'
      }).done(function(response) {

    
    for (var i = 0; i < 10; i++) {

      var giphyDiv = $('<div class="gallery">');

      var image = $('<img>').attr('src', response.data[i].images.downsized.url);

      var rating = response.data[i].rating;

      var putRatingHere = $('<p>').text("This giphy's rating: " + rating);
      
      giphyDiv.append(image);

      giphyDiv.prepend(putRatingHere);

    
      $('#animalsView').append(giphyDiv);
    }
  });
}


function createButtons() {

  $('#buttonsView').empty(); //this prevents repetetition of buttons

  //the function loops throgh the array of animals 
  for (var i = 0; i < animals.length; i++) {

    var a = $('<button>');
    a.addClass('btn btn-warning');
    a.attr('data-name', animals[i]); // add data-attribute
    a.text(animals[i]); //text for button
    $('#buttonsView').append(a); //add the button 

  }
}
// function that triggers the AJAX call 
$("#findAnimal").on('click', function() {


  var animal = $("#animalInput").val().trim(); //this is how the text from the input boxed is caputured

  animals.push(animal); // the animal from the input is added to the animals array

  createButtons();

  return false;


});

$(document).on('click', '.btn-warning', displayAnimal);

createButtons();

