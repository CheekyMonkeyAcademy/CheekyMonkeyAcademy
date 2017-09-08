$(document).ready(function() {
    var gameObject = {
        divs: ["div0", "div1", "div2", "div3"],
        timer: {

        },
        shapesGame: {
            correctShape: "Square",
            fourRandomShapesArray: [],
            shapesArray: ["Square", "Circle", "Triangle", "Rectangle", "Egg Shaped", "Diamond", "Polygon", "Sphere", "Rhombus", "Star", "Parallelogram"],
            colorArray: ["Red", "Blue", "Green", "Yellow", "Pink", "Black", "White", "Gold"]
        }
    }

    var shapeToClick = "Click on the shape" + gameObject.shapesGame.correctShape;

    assignShapeAndCallForGifToDiv();

    function assignShapeAndCallForGifToDiv() {
        clearDivs(); //Need to create a Div clearing function
        getFourRandomShapesIntoArray();

        for (i = 0; i < gameObject.shapesGame.fourRandomShapesArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisShape = gameObject.shapesGame.fourRandomShapesArray[i].shape;
            var thisSearchTerm = "shape " + thisShape;

            console.log("Div: " + thisDiv + " assigned shape " + thisShape + " using search: >" + thisSearchTerm + "<");

            getShapeAndAssignToDiv(thisSearchTerm, thisDiv);
        }

        for (j = 0; j < gameObject.shapesGame.fourRandomShapesArray.length; j++) {
            var thisDiv = "div" + (j);
            var thisColor = gameObject.shapesGame.fourRandomShapesArray[j].color;
            var thisColorTerm = "color " + thisColor;
        }

        //assigning winning shape
        gameObject.shapesGame.correctShape = gameObject.shapesGame.fourRandomShapesArray[getRandomFrom(4)].shape;
        gameObject.shapesGame.correctShape = gameObject.shapesGame.fourRandomShapesArray[getRandomFrom(4)].color;
        //voice prompt for shape
        computerSayThis("Please click on the image for the shape " + gameObject.shapesGame.correctShape);

    }

    function clearDivs() {
        gameObject.divs.forEach(function(div) {
            $("#" + div).empty();
            console.log("emptying: " + div);
        });
    }

    function getFourRandomShapesIntoArray() {
        gameObject.shapesGame.fourRandomShapesArray = [];
        for (i = 0; i < 4; i++) {
            gameObject.shapesGame.fourRandomShapesArray.push({shape: gameObject.shapesGame.shapesArray[getRandomFrom(11)], color: ''});
        }
        console.log(gameObject.shapesGame.fourRandomShapesArray);
    }

    function getRandomFrom(thisNumber) {
        var returnValue = Math.floor(Math.random() * thisNumber);
        return returnValue;
    }

    function computerSayThis(thingsToSay) {
        var msg = new SpeechSynthesisUtterance(thingsToSay);
        window.speechSynthesis.speak(msg);
    }

    function getShapeAndAssignToDiv(searchTerm, div) {
        var resultsObject = {};
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            searchTerm + "&api_key=dc6zaTOxFJmzC&limit=1";
        // This should end up using 1 - maybe pull more and rotate based on a timer?


        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            resultsObject = response.data;
            // TODO grab one from a randomized set - using 10 for testing (so I can see how the search terms look... it's not good)
            $.each(resultsObject, function(key, value) {
                var movingUrl = value.images.fixed_height.url;
                var rating = value.rating;

                if (rating = "G") { // kids game, let's keep it clean - can variable this later.  
                    var thisP = $("<p>");
                    thisP.text("Rating: " + rating.toUpperCase());
                    var targetParent = $("#" + div);
                    var thisDiv = $("<div>");
                    var thisGif = $("<img>");
                    // thisDiv.attr("class", "div-css")
                    thisGif.attr("src", movingUrl);
                    thisGif.attr("moving_url", movingUrl);
                    thisGif.attr("current_state", "moving")
                    thisGif.attr("assigned_shape", searchTerm);
                    thisGif.attr("class", "gif");
                    thisDiv.prepend(thisP);
                    thisDiv.append(thisGif);
                    targetParent.prepend(thisDiv);
                }
            });

            // TODO insure that we are in compliance with the rating requested (more gifs required here);
        });

    }

    $("#clicky-container").on("click", ".gif", function() {
        // console.log("you clicked: " + this);
        // console.log(this);
        // console.log($(this).attr("assigned_shape"));
        console.log("Correct_shape " + gameObject.shapesGame.correctShape);

        //Winning Conditions and Game reset
        if ($(this).attr("assigned_shape") === ("shape " + gameObject.shapesGame.correctShape)) {
            computerSayThis("Touchdown! You did great! You clicked the " + gameObject.shapesGame.correctShape);
            assignShapeAndCallForGifToDiv() //game reset with win
        } else {
            computerSayThis("Not this time batman! That was the " + $(this).attr("assigned_shape"))
        }

    });
}); //end doc.ready function