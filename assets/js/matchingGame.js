$(document).ready(function(){

//Game Object Variable
 var gameObject = {
 	matchGame: {
	 	numberOfSports: 2,
	 	numberOfCards: 4,
		sportsArray: ["baseball", "soccer", "american_football", "tennis", 
		"golf", "volleyball", "yoga", "gymnastics", "boxing", "hockey", "hiking", "bowling", 
		"softball", "track", "surfing", "billiards", "swimming"],
	}
}

//STEP 1: Randomly grab sports from the array
function chooseSportAtRandom(){
	var randomSports = gameObject.matchGame.sportsArray[getRandomFrom(gameObject.matchGame.sportsArray.length)];
	// console.log(displayRandomSports);
	return randomSports;
}

chooseSportAtRandom();

console.log("#ofSports: " + gameObject.matchGame.numberOfSports); //THIS WORKS!!
console.log("#ofCards: " + gameObject.matchGame.numberOfCards); //THIS WORKS!!

//STEP 2: Create cards based of the array
function storeAndPopulateAmountOfCards() {

	$("#makeCards").on("click", function(){
	var numberOfSports = $("#numberOfSportsChosen").val(); //THIS WORKS!!
	var cardsPerSport = $("#cardsPerSportChosen").val(); //THIS WORKS!!
	// var cardDisplay = numberOfSports * cardsPerSport;

	//THIS WORKS!!!
	for (var i = 0; i <  numberOfSports; i++) {
		var chosenSport = chooseSportAtRandom();
		assignSportImageToCard();






		for (var x = 0; x < cardsPerSport; x++) {			
			var newCardDiv = $("<div>");
			// Adding an image tag to append gettyImage to
			var createImgTag = $("<img>");
			newCardDiv.addClass(chosenSport);
			newCardDiv.addClass("newCardStyle");
			newCardDiv.append(createImgTag);
			//Add attributes to the div for image hidden, shown and flipping
			newCardDiv.attr("status", "show");
			newCardDiv.attr("status", "flipping");
			newCardDiv.attr("status", "hidden");
			$("#cardContainer").append(newCardDiv);
			var searchSport = chosenSport;
			console.log(newCardDiv);
			// console.log(createImgTag);
			console.log("This is searchSport " + searchSport);
			}
		}
	})
}

storeAndPopulateAmountOfCards();

//STEP 3: Reset the board for player to play again 
function resetTheBoard (){
	$("#resetBoard").on("click", function(){
		$("#cardContainer").html("");
		$("#numberOfSportsChosen").val("");
		$("#cardsPerSportChosen").val("");
	})
}

resetTheBoard();

//STEP 5: API FOR IMAGES 
function assignSportImageToCard(searchSport){
	var apiKey = "y482smscwdrv44u8raqcw77t";
	var appendApiKeyHeader = function( xhr ) {
		xhr.setRequestHeader('Api-Key', apiKey);
	}

	$.ajax({
		type: "GET",
		beforeSend:appendApiKeyHeader,
		url: "https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=" + searchSport
	})
	.done(function(responseData){
		var imageToBeMatched = responseData.images[0].display_sizes[0].uri
		console.log(responseData);
		console.log(responseData.images[0].display_sizes[0].uri);
		return imageToBeMatched;
		// console.log(imageToBeMatched + "this is image to be matched");
		
		})
}






}) //End of the document.ready function 













