$(document).ready(function () {
    //my api key as a var API_KEY
    var API_KEY = "e7QbBCLWuTVNeGTu0ACiTRMnxML4COsg";
    //var requestUrl to access
    var requestUrl = "https:api.giphy.com/v1/gifs/search?api_key=" + API_KEY + "&limit=10&q=";
    // topics array
    var topics = ["yoga",
        "dogs",
        "naps",
        "books",
        "music",
        "grohl",
        "travel",
        "arduino"];
        console.log("1working- after topics[]");
        
    // for loop to generate and populate length of array into buttons
    for (var i = 0; i < topics.length; i++) {
        //creating button variable and assigning it to an html button element 
        var button = $("<button>");
        //adding a bootstrap class to generated buttons
        button.addClass("btn btn-danger");
        //creates a button for the topic indexed in the topics array
        button.text(topics[i]);
        //creates the button in the html DOM
        $("#buttons").append(button);
        console.log("2working- inside topics 4loop");
        


    }

    //assigning on on click event  button
    $("button").on("click", function () {
        $("#gifs").empty();
        //jquery call on ajax
        $.ajax({
            method: "GET",
            url: requestUrl + $(this).text()
        }).then(function (response) {
            console.log("3 working-response.data" + response.data);
            for (var i = 0; i < response.data.length; i++) {
                var img = createImage(response, i);
                //populating <#gifs> with images
                $("#gifs").append(img);
                console.log("4 working inside second 4 loop ");
                
            }
        });
    });

    function createImage(response, i) {
        var img = $("<img>")
        // set source attribute of element (<img src="response.data[0].images.downsized.url)" alt="">)
        img.attr("src", response.data[i].images.downsized.url);
        //set attribute of image to still
        img.attr("data-still", response.data[i].images.downsized_still.url);
        //set an attribue of image to animated
        img.attr("data-animated", response.data[i].images.downsized.url);
        // set an attribute of image to state
        img.attr("data-state", "animated");

        var gifCard = $("<div class = 'gif-card'>");
        var pRating = $("<p>");

        gifCard.append(img);
        gifCard.append("Rating: " + response.data[i].rating);
        gifCard.append(pRating);
        return gifCard;
    }

    $("button").on("click", function () {
        //console.log("button works");
    });

    $("img").on("click", function () {
        //console.log("img works");
        var state = $(this).attr("data-state");
        // if data-state is animated
        if (state === "animated") {
            console.log("still");
            //set data-state to still
            $(this).attr("data-state", "still");
            //changing the srs of the data-state to still
            $(this).attr("src", $(this).attr("data-still"));
        } else {
            console.log("animated");
            $(this).attr("data-state", "animated");
            $(this).attr("src", $(this).attr("data-animated"));
        }
    });
});

