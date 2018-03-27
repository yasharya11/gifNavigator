$(document).ready(function () {


    var animals = ["Dog", "Cat", "Rat", "Alligator", "Ape", "Donkey", "Shrek", "Camel", "Pikachu", "Snake"]

    renderButtons();

    function renderButtons() {

        $("#buttonsCol").empty();

        for (var i = 0; i < animals.length; i++) {
            $("#buttonsCol").append("<button class='animalButton' data-animal=\"" + animals[i] + "\">" + animals[i] + "</button>");
        }
    }

    $(document).on("click", ".animalButton", function () {
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

                        var animalImage = $("<img>");
                        animalImage.attr("class", "giphy");
                        animalImage.attr("data-animate", results[i].images.fixed_height.url)
                        animalImage.attr("data-still", results[i].images.fixed_height_still.url)

                        var state = $(this).attr("data-state");

                        animalImage.attr("src", results[i].images.fixed_height.url);
                        animalImage.attr("data-state", "animate");

                        gifDiv.append(p);
                        gifDiv.append(animalImage);

                        $("#gifsBox").prepend(gifDiv);
                    }
                }
            });
    });

    $(document).on("click", ".giphy", function () {
        var state = $(this).attr("data-state");

        if (state === "still") {
            var srs = $(this).attr("data-animate");
            $(this).attr("src", srs);
            $(this).attr("data-state", "animate");
        } else {
            var src = $(this).attr("data-still");
            $(this).attr("src", src);
            $(this).attr("data-state", "still");
        }
    });

    $("#add-button").on("click", function (event) {
        // prevent page from refreshing when form tries to submit itself
        event.preventDefault();

        // Capture user inputs and store them into variables
        var animalVar = $("#animal-input").val().trim();

        animals.push(animalVar);

        // Console log each of the user inputs to confirm we are receiving them
        console.log("Animal: " + animalVar + " Created")
        $("#buttonsCol").append("<button class=\"animalButton\" data-animal=" + animalVar + ">" + animalVar + "</button>");
    });

});