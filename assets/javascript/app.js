//SETUP VARIABLES
/**Array of initial buttons**/
var topics = ["puppy", "panda", "pygmy goat", "manatee", "sloth", "elephant", "bunny", "hyena", "duckling", "chimpanzee", "lion", "cheetah", "tiger", "piglet", "seal", "chameleon", "kangaroo", "koala", "red panda", "fox", "mouse", "gerbil", "parakeet", "parrot", "polar bear", "meerkat"];
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//FUNCTIONS
/**Function for creating buttons for each item in the topics array**/
function renderButtons() {
  // Deleting the topic buttons prior to adding new buttons
  $("#buttons-div").empty();
  // Looping through the array of animals to dynamically generate buttons for each animal
	for (var i = 0; i < topics.length; i++) {
  	var b = $("<button>");
    // Adding classes
    b.addClass("btn btn-primary btn-xs animal-button");
    b.attr("id", "animal-button");
    // Adding a data-attribute with a value of the topic at index i
    b.attr("data-name", topics[i]);
    // Providing the button's text with a value of the topic at index i
    b.text(topics[i]);
    // Adding the button to the HTML
    $("#buttons-div").append(b);
    // Console logging the array of animals
    console.log(topics[i]);
  };
};

/**Function for button click triggering 10 random images to be placed on page**/
function displayImages() {  
  // Event listener for all button elements
  $(".animal-button").on("click", function() {
    console.log("click!");
    var animalTopic = $(this).attr("data-name");
    // Constructing a URL to search Giphy for the name of the animal in the button
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animalTopic + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Performing an AJAX GET request
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      // Deleting the GIFs prior to adding new GIFs
      $("#gif-container").empty();
      // Storing an array of results in the results variable
      var results = response.data;
      // Looping over every result item
      for (var i = 0; i < results.length; i++) {
        // Only taking action if the GIF has an appropriate rating
        if (results[i].rating !== "r") {
          // Creating a div with the class "item"
          var gifDiv = $("<div class='item'>");
          // Storing the result item's rating
          var rating = results[i].rating;
          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + rating);
          // Creating an image tag
          var animalImage = $("<img>");
          // Giving the image tag an src attribute of a property pulled off the result item
          animalImage.attr("src", results[i].images.fixed_height_still.url);
          // Adding still/animate
          animalImage.attr("data-still", results[i].images.fixed_height_still.url);
          animalImage.attr("data-animate", results[i].images.fixed_height.url);
          animalImage.attr("data-state", "still");
          // Appending the paragraph and animalImage to the "gifDiv" div
          gifDiv.append(animalImage);
          gifDiv.append(p);
          // Prepending the gifDiv to the "#gif-container" div in the HTML
          $("#gif-container").prepend(gifDiv);
          $(animalImage).on("click", function() {
            // Setting the data-state of the GIFs when clicked
            var state = $(this).attr("data-state");
            // If the clicked image's state is still, its src attribute updates to its data-animate value
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              // Setting the image's data-state to animate
              $(this).attr("data-state", "animate");
            // Else, the src is set to the data-still value
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            };
          });
        };
      };
    });
  });
};

/**Function to take user input, push it to the array, and remake a button for each item in the array**/
function remakeButtons() {	
	$("#add-topic").on("click", function(event) {
	  event.preventDefault();
	  // Grabbing the text from the input box
	  var animal = $("#inputDefault").val().trim();
	  // The user input from the textbox is then added to the topics array of animals
	  topics.push(animal);
	  console.log(topics);
	  $("#inputDefault").val("");
	 	// Calling the function to create buttons that display GIFs on-click
	  renderButtons();
    displayImages();
	});
};
 
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

//MAIN PROCESSES
$(document).ready(function() {
  remakeButtons();
 	renderButtons();
  displayImages();
});