var animals = ["Dog", "Cat", "Rat", "Alligator", "Ape", "Donkey", "Shrek", "Camel", "Pikachu", "Snake"]

for (var i = 0; i < animals.length; i++) {
    console.log("Animal: " + animals[i] + " Created")
    $("#buttonsCol").append("<button class='animalButton' data-animal=" + animals[i] + ">" + animals[i] + "</button>");
}

function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttonsCol").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {
        console.log("Animal: " + animals[i] + " Created")
        $("#buttonsCol").append("<button class='animalButton' data-animal=" + animals[i] + ">" + animals[i] + "</button>");
    }
}

$(".animalButton").on("click", function () {
    var animal = $(this).attr("data-animal");
    console.log("animalButton pressed");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {

                if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                    var gifDiv = $("<div class='col-md-6'>");

                    var rating = results[i].rating;

                    var p = $("<p>").text("Rating: " + rating);

                    var personImage = $("<img>");

                    personImage.attr("src", results[i].images.fixed_height.url);

                    gifDiv.append(p);
                    gifDiv.append(personImage);

                    $("#gifsBox").prepend(gifDiv);
                }
            }
        });
});

$("#add-button").on("click", function (event) {
    // prevent page from refreshing when form tries to submit itself
    event.preventDefault();

    // Capture user inputs and store them into variables
    var animalVar = $("#animal-input").val().trim();

    animals.push(animalVar);

    // Console log each of the user inputs to confirm we are receiving them
    console.log("Animal: " + animalVar + " Created")
    $("#buttonsCol").append("<button class='animalButton' data-animal=" + animalVar + ">" + animalVar + "</button>");
});

