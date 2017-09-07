$(document).ready(function(){
	var gameObject = {
			divs: ["div0", "div1", "div2", "div3"],
			userSettings: {
				name: "Insert Kids Name Here",
				gifMovement: true, //TODO implement
				userSex: "F" // TODO implement

			},
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
					success: [


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
			alphabetGame: {
				title: "Alphabet Game",
				correctLetter: "A",
				fourRandomLettersArray: [],
				alphabetArray: ["A", "B", "C", "D", "E", "F", "G", "H", 
								"I", "J", "K", "L", "M", "N", "O", "P", "Q", 
								"R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
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


	var letterToClick = "Click on " + gameObject.alphabetGame.correctLetter;

	// TODO click the right and get a good sound and a new letter

	// TODO click the wrong one and get a bad sound - no new letter
	setupPage();
	assignLetterAndCallForGifToDiv();

	function assignLetterAndCallForGifToDiv() {
		clearDivs();
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
		// assign our 'winning' letter for this round.
		gameObject.alphabetGame.correctLetter = gameObject.alphabetGame.fourRandomLettersArray[getRandomFrom(4)];
		// voice active asking kids to find said letter
		computerSayThis("Click the image for " + gameObject.alphabetGame.correctLetter);
	}

	function setupPage () {
		// assign title to html title
		$("#title").html(gameObject.alphabetGame.title);
	}

	function clearDivs() {
		gameObject.divs.forEach(function(div) {
			$("#"+div).empty();
			console.log("emptying: " + div)
		});
	}

	function getFourRandomLettersIntoArray() {
		gameObject.alphabetGame.fourRandomLettersArray = [];
		for (i = 0; i < 4; i++) {
			gameObject.alphabetGame.fourRandomLettersArray.push(gameObject.alphabetGame.alphabetArray[getRandomFrom(26)]);
			// TODO this can duplicate letters - do we want to eliminate that?  Or is a duplicate letter such a good thing?
			// If we have randomized gifs inside of a letter I would almost leave the 'mulitple success' in.  Sometimes mulitple things ARE true in life.
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

				if (rating = "G") { // kids game, let's keep it clean - can variable this later.  
			        var thisP = $("<p>");
			        thisP.text("Rating: " + rating.toUpperCase());
			        var targetParent = $("#" + div);
			        var thisDiv = $("<div>");
			        var thisGif = $("<img>");
			        // thisDiv.attr("class", "div-css")
			        thisGif.attr("src", movingUrl);
			        thisGif.attr("still_url", stillUrl);
			        thisGif.attr("moving_url", movingUrl);
			        thisGif.attr("current_state", "moving")
			        thisGif.attr("assigned_letter", searchTerm)
			        thisGif.attr("class", "gif");
			        thisDiv.prepend(thisP);
			        thisDiv.append(thisGif);
			        targetParent.prepend(thisDiv);
		    	}
	      	});

		// TODO insure that we are in compliance with the rating requested (more gifs required here);
		});
	}

	function getMessageForComputerToSay(successOrFailure) { 
		var messageArray = [];
		var tempArray = [];
		var returnMessage = "";
		console.log("received success or fail of: " + successOrFailure);
		messageArray = gameObject.message.general[successOrFailure];
		console.log(messageArray);

		// if (gameObject.userSettings.name != "") {
		// 	console.log("we have a name - it is: " + gameObject.userSettings.name);
		// 	messageArray.push(messageArray, gameObject.message.name[successOrFailure]);
		// }

		if (gameObject.userSettings.userSex === "M") {
			console.log("we have assignd sex of: " + gameObject.userSettings.userSex);
			tempArray = messageArray.concat(gameObject.message.male[successOrFailure]);
		}
		else if (gameObject.userSettings.userSex === "F") {
			console.log("we have assignd sex of: " + gameObject.userSettings.userSex);
			tempArray = messageArray.concat(gameObject.message.female[successOrFailure]);
		}
		else {
			console.log("no user sex is assigned - so we skip those responses");
		}

		messageArray = tempArray;

		console.log("final array" + messageArray);
		console.log(messageArray);

		returnMessage = messageArray[getRandomFrom(messageArray.length)];

		computerSayThis(returnMessage);
	}

	$("#clicky-container").on("click", ".gif", function(){
		console.log("received click on: " + this);
		console.log(this);
		console.log($(this).attr("assigned_letter"))
		console.log("alphabet letter " + gameObject.alphabetGame.correctLetter);
		if ($(this).attr("assigned_letter") === ("alphabet letter " + gameObject.alphabetGame.correctLetter)) {
			getMessageForComputerToSay("success");
			assignLetterAndCallForGifToDiv();
		}
		else {
			getMessageForComputerToSay("failure");
			computerSayThis("That is actually the image for: " + $(this).attr("assigned_letter"));
		}
	});
});