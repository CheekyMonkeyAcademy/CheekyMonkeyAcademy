$(document).ready(function(){

//Game Object Variable
 var gameObject = {
 	matchGame: {
	 	numberOfSports: 2,
	 	numberOfCards: 4,
		sportsArray: ["baseball", "soccer", "american football", "tennis", 
		"golf", "volleyball", "yoga", "gymnastics", "boxing", "hockey", "hiking", "bowling", 
		"softball", "track", "surfing", "martial arts", "figure skating", "billiards", "swimming"],
	}
}

console.log("#ofSports: " + gameObject.matchGame.numberOfSports); //THIS WORKS!!
console.log("#ofCards: " + gameObject.matchGame.numberOfCards); //THIS WORKS!!

function storeAndPopulateAmountOfCards (){

	$("#makeCards").on("click", function(){
	var numberOfSports = $("#numberOfSportsChosen").val();
	var cardsPerSport = $("#cardsPerSportChosen").val();
	var cardDisplay = numberOfSports * cardsPerSport;
	
	console.log("how many cards: " + cardDisplay);
	})
}

storeAndPopulateAmountOfCards();





//Set up API call to getty images

//Depending on user choice,
	//populate the number of cards selected

//Create a function:
	//If the cards match they stay turned over
	//If the cards to not match they turn over



}) //End of the document.ready function