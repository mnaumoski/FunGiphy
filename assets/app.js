//array of animals - these need to be buttons
var animals = ['turtle', 'cheeta', 'hampster', 'lion', 'gecko', 'cat', 'dog'];

function displayAnimal() {
  var animal = $(this).data("name");
  // 	// var key = "dc6zaTOxFJmzC";
  // 	//this the var that is used for the ajax call to giphy
  var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {

    var giphyDiv = $('<div class="giphy">');

    for (var i = 0; i < 9; i++) {

    var gifi = response.data[i].url;
    var putGifiHere = $('<p class="text-primary">').text("Giphy source: " + gifi);
    
    console.log(gifi);

    giphyDiv.append(putGifiHere);

    var image = $('<img>').attr('src', response.data[i].images.downsized.url);
    giphyDiv.append(image);

    var rating = response.data[i].rating;
    var putRatingHere = $('<p>').html("Rating: " + rating);
    console.log(rating);
    giphyDiv.append(putRatingHere);

    $('#animalsView').prepend(giphyDiv);

    console.log(response);
  }; 
});
}

// function validate() {
//   if (document.forms[form1].form2.value === "") {
//     alert("Not cool");
//     return false;
//   }
//   return true;
// }

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

