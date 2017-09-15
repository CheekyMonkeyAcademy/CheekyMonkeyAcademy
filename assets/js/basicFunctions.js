var gameObject = {

    divs: ["div0", "div1", "div2", "div3"],
    userSettings: {
        userId: "",
        displayName: "",
        name: "",
        gifMovement: true, //TODO implement
        userSex: "",
        mathGame: {
            minNumber: "",
            maxNumber: "",
            numberOfNumbers: ""
        }
    },
    gamesMenu: [
        ["index.html", "Home"],
        ["alphabet.html", "Alphabet Game"],
        ["shapes.html", "Shapes Game"],
        ["colors.html", "Colors Game"],
        ["animals.html", "Animals Game"],
        ["numbers.html", "Numbers Game"],
        ["math.html", "Math Game"],
        ["places.html", "Places Game"],
        ["login.html", "Login Menu"]
    ],
    timer: {

    },
    message: {
        general: {
            success: [
                "Great Job!",
                "Congratulations!",
                "Hoooray!",
                "Correct!",
                "Boooya!",
                "Holy Moley, you're right!",
                "Boom goes the dynamite",
                "Way to go!",
                "High Five!",
                "Cheers!",
                "Woot!",
                // TODO add success in other languages - spanish?  french?  german?  chinese?
                "Tray Bien!", /// YES, I KNOW THIS IS Tres - it's PHONETIC!!!!
                "Great Success!  Waa waa wee wa",
                "And that's a homerun!",
                "Muey Bueno",
                "That was totally wicked",
                "Sweet!",
                "Superb!",
                "Impressive",
                "Most impressive",
                "Terrific",
                "You get a gold star",
                "You're my favorite wookie"
            ],
            failure: [
                "Please try again",
                "These are not the droids you're looking for",
                "Oops",
                "Almost - try another",
                "some of these are confusing",
                "Not quite",
                "Batman says:  Nope",
                "ka-thunk",
                "I ate your cookie, sorry",
                "Nice try, buddy",
                "Talk to the hand",
                "You're drifting to the dark side",
                "No soup for you!"
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
    animalGame: {
        correctAnimal: "ants",
        fourRandomAnimalsArray: [],
        animalArray: ["ants", "alpaca", "antelope", "Bat", "beaver", "panther", "dragonfly", "pigeon", "prairie Dog", "dolphin", "Eagle", "Fish",
            "Goose", "Hawk", "Impala", "jackal", "elephant", "Kangaroo", "Lion", "lady bug",
            "Monkey", "snail", "bird", "Ostrich", "Pig", "Quinling panda", "raccoon",
            "Salamander", "owl", "squirrel", "seagull", "sealion", "Tiger", "Urchin", "Vulture", "wolf", "squirrel",
            "mongoose", "Zebra"
        ],
    },
    shapesGame: {
        correctShape: "Square",
        fourRandomShapesArray: [],
        shapesArray: ["square", "circle", "triangle", "rectangle", "egg shaped", "diamond", "hexagon", "sphere", "rhombus", "star", "prism", "octogon", "zig zag", "bow tie", "pentagon", "trapezium", "cylinder", "cube", "cone", "decagon", "arrow", "dodecahedron"],
        // merge conflict fix - talk with Robert on this one - which is right    
        // shapesArray: ["Square", "Circle", "Triangle", "Rectangle", "Egg Shaped", "Diamond", "Polygon", "Sphere", "Rhombus", "Star", "Parallelogram"],
        colorArray: ["Red", "Blue", "Green", "Yellow", "Pink", "Black", "White", "Gold"]
    },
    placesGame: {
        correctPlace: "san francisco",
        placesArray: ["san francisco", "new york city", "london", "paris", "the rocky mountains", "chicago"]
    },
    alphabetGame: {
        correctLetter: "A",
        fourRandomLettersArray: [],
        alphabetArray: ["A", "B", "C", "D", "E", "F", "G", "H",
            "I", "J", "K", "L", "M", "N", "O", "P", "Q",
            "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
        ]
    },
   
    numbersGame: {
        correctNumber: "1",
        fourRandomNumbersArray: [],
        numbersArray: ["1", "2", "3", "4", "5", "6", "7", "8", "9"] // the number 0 has no giphy entry
    },
    mathGame: {
        correctAnswer: "1",
        correctQuestion: "",
        fourRandomAnswersArray: [],
        minNumber: 1,
        maxNumber: 3,
        numberOfNumbers: 2
    }
};


function createMenu() {
    for (var i = 0; i < gameObject.gamesMenu.length; i++) {
        var newMenuItem = $("<a>");
        newMenuItem.attr("href", gameObject.gamesMenu[i][0]);
        newMenuItem.text(gameObject.gamesMenu[i][1]);
        $("#mySidenav").append(newMenuItem);
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "25%";
}
//NavBar close page function
function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function getGifAndAssignToDiv(searchTerm, div) {
    var resultsObject = {};
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        searchTerm + "&api_key=dc6zaTOxFJmzC&limit=1";
    // This should end up using 1 - maybe pull more and rotate based on a timer?

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response) {

        resultsObject = response.data;
        $.each(resultsObject, function(key, value) {
            var movingUrl = value.images.fixed_height.url;
            var stillUrl = value.images.fixed_height_still.url;
            var rating = value.rating;

            if (rating = "G") { // kids game, let's keep it clean - can variable this later.  
                var thisP = $("<p>");
                // thisP.text(rating.toUpperCase());
                var targetParent = $("#" + div);
                var thisDiv = $("<div>");
                var thisGif = $("<img>");
                thisGif.attr("src", movingUrl);
                thisGif.attr("moving_url", movingUrl);
                thisGif.attr("static_url", stillUrl);
                thisGif.attr("current_state", "moving");
                thisGif.attr("assigned_thing", searchTerm);
                thisGif.attr("class", "gif");
                thisDiv.prepend(thisP);
                thisDiv.append(thisGif);
                targetParent.prepend(thisDiv);
            }
        });
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

function getRandomFromMinMax(minNumber, maxNumber) {
    maxNumber++ // this allows us to hit the max number
    var returnValue = Math.floor(Math.random() * (maxNumber - minNumber)) + minNumber;
    return returnValue;
}

function computerSayThis(thingsToSay) {
    var msg = new SpeechSynthesisUtterance(thingsToSay);
    var voices = window.speechSynthesis.getVoices(msg);
    window.speechSynthesis.speak(msg);
}

function getMessageForComputerToSay(successOrFailure) {
    var messageArray = [];
    var tempArray = [];
    var returnMessage = "";

    messageArray = gameObject.message.general[successOrFailure];

    if (gameObject.userSettings.name != "") {
        console.log("we have a name - it is: " + gameObject.userSettings.name);
        tempArray = messageArray.concat(gameObject.message.name[successOrFailure]);
        messageArray = tempArray;
    }

    if (gameObject.userSettings.userSex === "M") {
        tempArray = messageArray.concat(gameObject.message.male[successOrFailure]);
        messageArray = tempArray;
    } else if (gameObject.userSettings.userSex === "F") {
        tempArray = messageArray.concat(gameObject.message.female[successOrFailure]);
        messageArray = tempArray;
    } else {
        // no assigned sex
    }

    returnMessage = messageArray[getRandomFrom(messageArray.length)];

    computerSayThis(returnMessage);
}

 function getWikipediaEntry(searchTerm) {
    
    var url =
      "https://en.wikipedia.org/w/api.php?action=opensearch&search=" +
      searchTerm +
      "&format=json&callback=?&limit=1";
    $.ajax({
      type: "GET",
      url: url,
      async: false,
      dataType: "json",
      
      success: function(data) {
      
        $("#resultbutton").attr("href", data[3][0]);
        $("#resultbutton").html("Search Wikipedia for: " + searchTerm);
  },
      error: function(error) {
        alert("error");
      }
    }); //ajax ends
  }


