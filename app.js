$(document).ready(function () {
    //my api key as a var API_KEY
    var API_KEY = "e7QbBCLWuTVNeGTu0ACiTRMnxML4COsg";
    //var requestUrl to access
    var requestUrl = "https:api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";//hearstone
    // topics array
    var topics = ["hamburger",
        "taco",
        "burrito",
        "nacho",
        "salad"];
    // for loop to generate and populate length of array into buttons
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("btn btn-danger");
        button.text(topics[i]);
        $("#buttons").append(button);


    }
    //button on click event to generate 10 static images
    $("button").on("click", function () {

        //console.log(img);
        $("#gifs").empty();
        $.ajax({
            method: "GET",
            url: requestUrl + $(this).text()
        }).then(function (response) {

            for (var i = 0; i < response.data.length; i++) {
                var img = $("<img>")

                // set source attribute of element (<img src="response.data[0].images.downsized.url)" alt="">)
                img.attr("src", response.data[i].images.downsized.url);
                // targeting <body> appending(adding) img 
                $("body").append(img);
                //set attribute of image to still
                img.attr("data-still", response.data[i].images.downsized_still.url);
                //set an attribue of image to animated
                img.attr("data-animated", response.data[i].images.downsized.url);
                // set an attribute of image to state
                img.attr("data-state", "animated");



                img.on("click", function () {

                    var state = $(this).attr("data-state");
                    if (state === "animated") {
                        console.log("still");
                        $(this).attr("data-state", "still");
                        $(this).attr("src", $(this).attr("data-still"));

                    } else {
                        console.log("animated");
                        $(this).attr("data-state", "animated");
                        $(this).attr("src", $(this).attr("data-animated"));
                    }

                });
                //populating #gifs with images
                $("#gifs").append(img);
            }
        });
    });
});
