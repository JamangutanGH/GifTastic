$(document).ready(function () {
    // topics array
    var topics = ["hamburger",
        "taco",
        "burrito",
        "nacho",
        "salad"];

    //my api key as a var API_KEY
    var API_KEY = "e7QbBCLWuTVNeGTu0ACiTRMnxML4COsg";
    //var requestUrl to access
    var requestUrl = "https:api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";


    // for loop to generate and populate length of array into buttons
    for (var i = 0; i < topics.length; i++) {
        //create a button variable and assigning it to an html element 
        var button = $("<button>");
        //add the bootstap class danger to the previously created button
        button.addClass("btn btn-danger topic");
        //assign text to the buttons created topics[], and the corresponding 4loop value
        button.text(topics[i]);
        //target anything with the class button and append the buttons created
        $("#buttons").append(button);
    }

    function createImage(response, i) {
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

        var gifCard = $("<div class='gif-card'>");
        var pRating = $("<p>");

        gifCard.append(img);
        pRating.append("Rating: " + response.data[i].rating);
        gifCard.append(pRating);
        return gifCard;
    }

    $("button").on("click", function () {
        $("#gifs").empty();
        $.ajax({
            method: "GET",
            url: requestUrl + $(this).text()
        }).then(function (response) {
            //iterate over the data recieved and populate into <img> named as a variable img
            for (var i = 0; i < response.data.length; i++) {
                var img = createImage(response, i);
                //response.data[i].rating
                console.log(response.data[i].rating);


                //populating #gifs with images
                $("#gifs").append(img);
            }
        });


    });

    $("img").on("click", function () {

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

    })

});