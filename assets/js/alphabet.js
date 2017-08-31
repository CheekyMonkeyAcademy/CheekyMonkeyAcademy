$(document).ready(function(){
	var gameObject = {
			divs: ["div0", "div1", "div2", "div3"],
			timer: {

			},
			alphabetGame: {
				correctLetter: "A",
				fourRandomLettersArray: [],
				alphabetArray: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
				gifMovement: true
			},
			otherGame: {

			},
			yetAnotherGame: {

			}
	}
	



	// console.log(gameObject)
	// gameObject.divs.forEach(function(div) {
	// 	console.log(div);
	// });


	var letterToClick = "Click on the letter" + gameObject.alphabetGame.correctLetter;

	// computerSayThis(letterToClick);
	// computerSayThis("That was AWESOME!!!");

	// TODO load 4 items from the alphabet array - load 1 into each div as the target image

	
	// TODO click the right and get a good sound and a new letter

	// TODO click the wrong one and get a bad sound - no new letter

	assignLetterAndCallForGifToDiv();

	function assignLetterAndCallForGifToDiv() {
		getFourRandomLettersIntoArray();
		// we have 4 divs and 4 letters - select one of each and assign

		for (i = 0; i < gameObject.alphabetGame.fourRandomLettersArray.length; i++) {
			var thisDiv = "div" + (i);
			var thisLetter = gameObject.alphabetGame.fourRandomLettersArray[i]
			var thisSearchTerm = "alphabet letter " + thisLetter;
			// TODO a search term for letters seems not be the best way to get gifs - we might need to go from a static gif set
			// Or find a search term that works more unformly (I doubt one exists)
			// alternatively, we just accept the random fails and move forward?
			// perhaps rotate through gifs every few seconds?  give the page more of a 'live' feel?   
			// dunno, this is a bit of a work in progress.  
			console.log("Div: " + thisDiv + " assigned letter: " + thisLetter + " using search: >" + thisSearchTerm + "<");

			getGifAndAssignToDiv(thisSearchTerm, thisDiv);

		}
	}

	function getFourRandomLettersIntoArray() {
		gameObject.alphabetGame.fourRandomLettersArray = [];
		for (i = 0; i < 4; i++) {
			gameObject.alphabetGame.fourRandomLettersArray.push(gameObject.alphabetGame.alphabetArray[getRandomFrom(26)]);
			// TODO this can duplicate letters - do we want to eliminate that?  Or is a duplicate letter such a good thing?
		}
		console.log(gameObject.alphabetGame.fourRandomLettersArray);
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
    	searchTerm + "&api_key=dc6zaTOxFJmzC&limit=10"; // This should end up using 1 - maybe pull more and rotate based on a timer?

    	$.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {

      	resultsObject = response.data;
      	// TODO grab one from a randomized set
      	$.each(resultsObject, function(key, value) {
	        var movingUrl = value.images.fixed_height.url;
	        var stillUrl = value.images.fixed_height_still.url;
	        var rating = value.rating;

			if (rating = "G") { // kids game, let's keep it clean - can variable this later.  
		        var thisP = $("<p>");
		        thisP.text("Rating: " + rating.toUpperCase());
		        var targetParent = $("#" + div);
		        var thisDiv = $("<div>");
		        var thisGif = $("<img>");
		        thisDiv.attr("class", "div-css")
		        thisGif.attr("src", movingUrl);
		        thisGif.attr("still_url", stillUrl);
		        thisGif.attr("moving_url", movingUrl);
		        thisGif.attr("current_state", "moving")
		        thisGif.attr("class", "gif");
		        thisDiv.prepend(thisP);
		        thisDiv.append(thisGif);
		        targetParent.prepend(thisDiv);
	    	}
      	});

		// TODO insure that we are in compliance with the rating requested (more gifs required here);
		});

	}

	$("#clicky-container").on("click", ".clicky", function(){
		console.log("received click on: " + this);
		console.log(this);
	});
});