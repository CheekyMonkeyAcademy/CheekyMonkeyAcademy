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

// numberOfCardDivs = [];

console.log("#ofSports: " + gameObject.matchGame.numberOfSports); //THIS WORKS!!
console.log("#ofCards: " + gameObject.matchGame.numberOfCards); //THIS WORKS!!

function storeAndPopulateAmountOfCards() {

	$("#makeCards").on("click", function(){
	var numberOfSports = $("#numberOfSportsChosen").val(); //THIS WORKS!!
	var cardsPerSport = $("#cardsPerSportChosen").val(); //THIS WORKS!!
	// var cardDisplay = numberOfSports * cardsPerSport;

	//THIS WORKS!!!
	for (var i = 0; i <  (numberOfSports * cardsPerSport); i++) {
		var newCardDiv = $("<div>");
		newCardDiv.addClass("newCardStyle");
		$("#cardContainer").append(newCardDiv);
		console.log(newCardDiv);
		}
	})
}

storeAndPopulateAmountOfCards();

//Reset the board for player to play again 
function resetTheBoard (){
	$("#resetBoard").on("click", function(){
		$("#cardContainer").html("");
		$("#numberOfSportsChosen").val("");
		$("#cardsPerSportChosen").val("");
	})
}

resetTheBoard();

//API FOR IMAGES CODE!!!!!
function assignSportImageToCard(searchSport){
var apiKey = "y482smscwdrv44u8raqcw77t";
var appendApiKeyHeader = function( xhr ) {
  xhr.setRequestHeader('Api-Key', apiKey)
};


$.ajax({
	type: "GET",
	beforeSend:appendApiKeyHeader,
	url: "https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=" + searchSport
})
	.done(function(responseData){
		console.log(responseData);
		console.log(responseData.images[0].display_sizes[0].uri);
	})
} 


assignSportImageToCard("baseball"); 



}) //End of the document.ready function 


//Before you make cards, we will get our sports from the array

//when we make the cards, we need to make number of cards
	//We need a class before we make cards
	//assign class that will allow us to assign an image
	//number of cards that have a class of sport #
	//Can't create divs first
