$(document).ready(function(){
	var gameObject = {
			divs: ["div1", "div2", "div3", "div4"],
			timer: {

			},
			alphabetGame: {
				correctLetter: "A",
				fourRandomLetters: [],
				alphabetArray: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]
			},
			otherGame: {

			},
			moreGames: {

			}
	}
	
	// function putItAllTogether() {

	// }



	// console.log(gameObject)
	gameObject.divs.forEach(function(div) {
		console.log(div);
	});


	var letterToClick = "Click on the letter" + gameObject.alphabetGame.correctLetter;

	computerSayThis(letterToClick);
	// TODO load 4 items from the alphabet array - load 1 into each div as the target image

	computerSayThis("That was AWESOME!!!");

	// TODO text-to-speech asking for the target letter to be clicked (optional)


	// TODO click the right and get a good sound and a new letter

	// TODO click the wrong one and get a bad sound - no new letter
	
	getFourRandomLetters();

	function getFourRandomLetters() {
		gameObject.alphabetGame.fourRandomLetters = [];
		for (i = 0; i < 4; i++) {
			gameObject.alphabetGame.fourRandomLetters.push(gameObject.alphabetGame.alphabetArray[getRandomFrom(26)]);
			// console.log(i);
		}
		console.log(gameObject.alphabetGame.fourRandomLetters);
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

	function loadGifsFromSearchTerm(searchTerm) {
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    	searchTerm + "&api_key=dc6zaTOxFJmzC&limit=1";

    	$.ajax({
        	url: queryURL,
        	method: "GET"
        }).done(function(response) {

      	var resultsObject = response.data;

      	console.log(resultsObject);
		});
		return resultsObject;
	}

	$("#clicky-container").on("click", ".clicky", function(){
		console.log("received click on: " + this);
		console.log(this);
	});
});