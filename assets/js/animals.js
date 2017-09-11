$(document).ready(function(){
	var gameObject = {
			divs: ["div0", "div1", "div2", "div3"],
			timer: {

			},
			animalGame: {

				correctAnimal: "ants",
				fourRandomAnimalsArray: [],
				animalArray: ["ants", "alpaca", "antelope", "Bat", "beaver", "panther", "dragonfly", "pigeon", "prairie Dog", "dolphin", "Eagle", "Fish",
				 "Goose", "Hawk", "Impala", "jackal", "elephant", "Kangaroo", "Lion", "lady bug", 
				  "Monkey", "snail", "bird", "Ostrich", "Pig", "Quinling panda", "raccoon",
				   "Salamander", "owl", "squirrel", "seagull", "sealion", "Tiger", "Urchin", "Vulture", "wolf", "squirrel", 
				   "mongoose", "Zebra"],
				gifMovement: true
			},
			otherGame: {

			},
			yetAnotherGame: {

			}
	};
	

	var animalToClick = "Click on the animal" + gameObject.animalGame.correctAnimal;

	// computerSayThis(animalToClick);
	// computerSayThis("That was AWESOME!!!");

	// TODO load 4 items from the animal array - load 1 into each div as the target image

	
	// TODO click the right and get a good sound and a new animal

	// TODO click the wrong one and get a bad sound - no new animal

	assignAnimalAndCallForGifToDiv();

	function assignAnimalAndCallForGifToDiv() {
		clearDivs();
		getFourRandomAnimalsIntoArray();
		// we have 4 divs and 4 animals - select one of each and assign

		for (i = 0; i < gameObject.animalGame.fourRandomAnimalsArray.length; i++) {
			var thisDiv = "div" + (i);
			var thisAnimal = gameObject.animalGame.fourRandomAnimalsArray[i];


			var thisSearchTerm = "nature " + thisAnimal;

			// TODO a search term for animals seems not be the best way to get gifs - we might need to go from a static gif set
			// Or find a search term that works more unformly (I doubt one exists)
			// alternatively, we just accept the random fails and move forward?
			// perhaps rotate through gifs every few seconds?  give the page more of a 'live' feel?   
			// dunno, this is a bit of a work in progress.  

			console.log("Div: " + thisDiv + " assigned_animal: " + thisAnimal + " using search: >" + thisSearchTerm + "<");




			getGifAndAssignToDiv(thisSearchTerm, thisDiv);
		}
		// assign our 'winning' animal for this round.
		gameObject.animalGame.correctAnimal = gameObject.animalGame.fourRandomAnimalsArray[getRandomFrom(4)];
		sample();
		// voice active asking kids to find said animal
		computerSayThis("find " + gameObject.animalGame.correctAnimal);
	}

	function clearDivs() {
		gameObject.divs.forEach(function(div) {
			$("#"+div).empty();
			console.log("emptying: " + div);
		});
	}

	function getFourRandomAnimalsIntoArray() {
		gameObject.animalGame.fourRandomAnimalsArray = [];
		for (i = 0; i < 4; i++) {
			gameObject.animalGame.fourRandomAnimalsArray.push(
				gameObject.animalGame.animalArray[
				getRandomFrom(gameObject.animalGame.animalArray.length)]);
			// TODO this can duplicate animals - do we want to eliminate that?  Or is a duplicate animal such a good thing?
			// If we have randomized gifs inside of a animal I would almost leave the 'mulitple success' in.  Sometimes mulitple things ARE true in life.
		}
		console.log(gameObject.animalGame.fourRandomAnimalsArray);
	}
		
	function getRandomFrom(thisNumber) {
		var returnValue = Math.floor(Math.random() * thisNumber);
		return returnValue;
	}

	function computerSayThis(thingToSay) {
		var msg = new SpeechSynthesisUtterance(thingToSay);
		// TODO check for other voices
		window.speechSynthesis.speak(msg);
	}	

	function getGifAndAssignToDiv(searchTerm, div) {
		var resultsObject = {};
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
    	searchTerm + "&api_key=dc6zaTOxFJmzC&limit=1"; // This should end up using 1 - maybe pull more and rotate based on a timer?

    	$.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {

	      	resultsObject = response.data;
	      	// TODO grab one from a randomized set - using 10 for testing (so I can see how the search terms look... it's not good)
	      	$.each(resultsObject, function(key, value) {
		        var movingUrl = value.images.fixed_height.url;
		        var stillUrl = value.images.fixed_height_still.url;
		        var rating = value.rating;

				if (rating = "g") {
			        var thisP = $("<p>");
			        thisP.text("Rating: " + rating.toUpperCase());
			        var targetParent = $("#" + div);
			        var thisDiv = $("<div>");
			        var thisGif = $("<img>");
			        // thisDiv.attr("class", "div-css")
			        thisGif.attr("src", movingUrl);
			        thisGif.attr("still_url", stillUrl);
			        thisGif.attr("moving_url", movingUrl);
			        thisGif.attr("current_state", "moving");
			        thisGif.attr("assigned_animal", searchTerm);
			        thisGif.attr("class", "gif");
			        thisDiv.prepend(thisP);
			        thisDiv.append(thisGif);
			        targetParent.prepend(thisDiv);
		    	}
	      	});

		});

	}

	$("#clicky-container").on("click", ".gif", function(){
		console.log("received click on: " + this);
		console.log(this);
		console.log($(this).attr("assigned_animal"));

		console.log("nature " + gameObject.animalGame.correctAnimal);
		if ($(this).attr("assigned_animal") === ("nature " + gameObject.animalGame.correctAnimal)) {

			computerSayThis("This is correct!!!");
			 // + gameObject.animalGame.correctAnimal);
			assignAnimalAndCallForGifToDiv();
		}
		else {
			
		}
	});


 function sample() {
    var searchTerm = gameObject.animalGame.correctAnimal;
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
        // $(".question").html("<hr>");
      
        $("#resultbutton").attr("href", data[3][0]);
        $("#resultbutton").html("Search Wikipedia for: " + searchTerm);
  },
      error: function(error) {
        alert("error");
      }
    }); //ajax ends
  }; 


  

});