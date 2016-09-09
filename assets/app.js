$(document).ready(function() {

  //array of animals - buttons
  var animals = ['turtle', 'cheeta', 'hampster', 'lion', 'gecko', 'cat', 'dog'];

  function displayAnimal() {
    $("#animalsView").empty();
    var animal = $(this).data("name"); //this the var that is used for the ajax call to giphy
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC";
    $.ajax({
      url: queryURL,
      method: 'GET'
    }).done(function(response) {
      console.log(response);
      // this first loop creates a gallery of still images; the data-animated is the animated
      for (var i = 0; i < 10; i++) {
        var giphyDiv = $('<div class="gallery">');
        var image = $('<img>');
        image.addClass('clickChange');
        image.attr('src', response.data[i].images.original.url);
        image.attr('data-still', response.data[i].images.original_still.url);
        // image.addClass("clickToMove");

        //Add rating
        var rating = response.data[i].rating;
        var putRatingHere = $('<p>').text("This giphy's rating: " + rating);
        giphyDiv.append(image);
        giphyDiv.prepend(putRatingHere);
        $('#animalsView').append(giphyDiv);

      }
    });
  }
  // Replace the still with its dynamic mate
  function animateImage() {
    var stillImg = $(this).attr('data-still');
    var animatedImg = $(this).attr('src');
    $(this).attr('data-still', animatedImg);
    $(this).attr('src', stillImg);
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
  // seach animal and add it to the array;
  $("#findAnimal").on('click', function() {
    var animal = $("#animalInput").val().trim(); //this is how the text from the input boxed is caputured
    if (animal === "") {
      alert("Please type animal name"); //in case user presses button wihtout input
      $(".error").text("*This field is required");
    } else {
      animals.push(animal); // the animal from the input is added to the animals array
      createButtons();
    }
    return false;
  });

  $(document).on('click', '.btn-warning', displayAnimal);
  $(document).on('click', '.clickChange', animateImage);

  createButtons();
});