    // exports.basicFunction = function(){}

    function openNav() {
        document.getElementById("mySidenav").style.width = "25%";
    }
    //NavBar close page function
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    // $(document).ready(function() {
    //NavBar open page function

    var gameObject = {

        divs: ["div0", "div1", "div2", "div3"],
        fourRandomShapesArray: [],
        //firebase logins
        userSettings: {
            name: "Kyle",
            gifMovement: true, //TODO implement
            userSex: "" // TODO implement

        },

        //
        timer: {

        },
        message: {
            general: {
                success: [
                    "Great Job!",
                    // "Congratulations!",
                    // "Hooray!",
                    // "Correct!",
                    "Booya!"
                ],
                failure: [
                    "Please try again",
                    // "Oops",
                    // "Almost - try another",
                    // "some of these are confusing",
                    "Not quite"
                ]
            },
            name: {
                success: [ //TODO finish implementation
                    // "Atta boy " + 
                    //gameObject.userSettings.name //, 
                    // "good job " + gameObject.userSettings.name

                ],
                failure: [

                ]
            },
            male: {
                success: [
                    "Atta boy!",
                    "good job, son!"
                ],
                failure: [
                    "try again young man",
                    "good luck next go young man"
                ]
            },
            female: {
                success: [
                    "atta girl!",
                    "good job, young lady"
                ],
                failure: [
                    "try again young woman",
                    "good luck next time young lady"
                ]
            }
        },
        shapesGame: {
            correctShape: "Square",
            //fourRandomShapesArray: [],
            shapesArray: ["square", "circle", "triangle", "rectangle", "egg shaped", "diamond", "hexagon", "sphere", "rhombus", "star", "prism", "octogon", "zig zag", "bow tie"],
            colorArray: ["Red", "Blue", "Green", "Yellow", "Pink", "Black", "White", "Gold"]
        },
        alphabetGame: {

        }
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
                        thisP.text(rating.toUpperCase());
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


    

    function clearDivs() {
        gameObject.divs.forEach(function(div) {
            $("#" + div).empty();
            console.log("emptying: " + div);
        });
    }

    function getRandomFrom(thisNumber) {
        var returnValue = Math.floor(Math.random() * thisNumber);
        return returnValue;
    }

    function computerSayThis(thingsToSay) {
        var msg = new SpeechSynthesisUtterance(thingsToSay);
        window.speechSynthesis.speak(msg);
    }

    // });