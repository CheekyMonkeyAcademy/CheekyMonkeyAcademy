$(document).ready(function(){
createMenu();

//Game Object Variable
var gameObject = {
	matchGame: {
		numberOfSports: 2,
		numberOfCards: 4,
		sportsArray: ["baseball", "soccer", "american_football", "tennis", 
		"golf", "volleyball", "yoga", "gymnastics", "boxing", "hockey", "hiking", "bowling", 
		"softball", "track", "surfing", "billiards", "swimming"],
	selectedSportsArray: [],
	}
}
var searchSport;
var chosenSport;

// //STEP 1: Randomly grab sports from the array
// function chooseSportAtRandom(){
//  var randomSports = gameObject.matchGame.sportsArray[getRandomFrom(gameObject.matchGame.sportsArray.length)];
//  // console.log(displayRandomSports);
//  return randomSports;
// }

// chooseSportAtRandom();   

// console.log("#ofSports: " + gameObject.matchGame.numberOfSports); //THIS WORKS!!
// console.log("#ofCards: " + gameObject.matchGame.numberOfCards); //THIS WORKS!!

//STEP 1: Create cards based of the array
$("#makeCards").on("click", function(){

    //STEP 2: Randomly grab sports from the array
    function chooseSportAtRandom(){
    	var randomSports = gameObject.matchGame.sportsArray[getRandomFrom(gameObject.matchGame.sportsArray.length)];
    console.log(randomSports + " This is Random Sport");
    return randomSports;
    	//SIDE NOTE: return statements cease execution in a function and return a value to the caller
	}

	//THIS WORKS! But pulling from game object
    console.log("#ofSports: " + gameObject.matchGame.numberOfSports); 
    console.log("#ofCards: " + gameObject.matchGame.numberOfCards); 

    chooseSportAtRandom();

    //STEP 3: Grab user input and create cards with function
    function storeAndPopulateAmountOfCards() {  
    	//Grab the value of the user input and create cards
	    var numberOfSports = $("#numberOfSportsChosen").val(); 
	    var cardsPerSport = $("#cardsPerSportChosen").val(); 
	    // var cardDisplay = numberOfSports * cardsPerSport;

	    //STEP 4: Create a FOR LOOP over number of sports
	    for (var i = 0; i <  numberOfSports; i++) {
	    	//Depending on how many sports the user inputs for the value
	    		//The loop will run the FXN chooseSportAtRandom over the sport array
	    		//Each random sport chosen will be assigned to the variable chosenSport 
	    			//To pass in later into the AJAX request
	    	var chosenSport = chooseSportAtRandom();
	    	//RON did this!! WHAT IS IT DOING????????(THIS IS A PROMISE- Not learned yet?) SOOO....
	    		//Create a variable where the image pulled from the AJAX request 
	    			//in the assignSportImageToCard FXN can be stored
	    		//With the .done, we are saying "WE PROMISE to get you an image to store in this variable, 
	    			//YOU JUST NEED TO COMPLETE THE AJAX request down below first!!!!!"
	    		//Without the promise, I can push all the images into an array and then place those in divs
	    	// var imgUrl = useSportToCallImage(chosenSport).done(function(result){
	    	// 	console.log('result' + chosenSport, result);
	    	// });

	    	// console.log("URL IS " + imgUrl);

	    	//STEP 5: Create another FOR LOOP where you loop over cardsPerSport the user inputs
	    		for (var x = 0; x < cardsPerSport; x++) {   
	    		//Create a new variable for the amount of cards per sport to be created
	    			//And Create a new DIV element        
		    		var newCardDiv = $("<div>");
		            //Add an image tag to append gettyImage to
		            var createImgTag = $("<img>");
		            //ADD Class to the div of the sport randomly chosen- defined in first FOR LOOP
		            	//This will be used for the ajax request
		            newCardDiv.addClass(chosenSport);
		            //This is styling so that the divs are visible on the screen
		            newCardDiv.addClass("newCardStyle");
		            //Adding the img tag to the div created so that
		            	//The image can be added
		            newCardDiv.append(createImgTag);
		            //Add attributes to the div for image hidden, shown and flipping
		            // newCardDiv.attr("status", "show");
		            // newCardDiv.attr("status", "flipping");
		            // newCardDiv.attr("status", "hidden");

		            //Adding the newly created divs and their properties to the cardContainer
		            $("#cardContainer").append(newCardDiv);
		            //Defining the global variable set up above to the sport chosen
		            searchSport = chosenSport;
		            // console.log(newCardDiv);
		            // console.log(createImgTag);
		            // console.log("This is searchSport " + searchSport);
		        }//END of INNER FOR LOOP
	    	} //END of OUTER FOR LOOP
	} //END of storeAndPopulateCardsFXN

	storeAndPopulateAmountOfCards();

	//STEP 6: API FOR IMAGES 
		//This is where things get tricky-----
	//Create a function to pull the images with AJAX
	function useSportToCallImage(mySearchSport){
		var returnVariable = "";
		//THIS below was determined by GettyImages- DO NOT TOUCH!!!
		var apiKey = "y482smscwdrv44u8raqcw77t";
		var appendApiKeyHeader = function( xhr ) {
			xhr.setRequestHeader('Api-Key', apiKey);
		}

		//KYLE HELPED WITH THIS PEICE ALSO--DO NOT TOUCH!!
			//This is the URL needed to search through Getty Images API 
			//And pass in the sport chosen and return the thumbnail image of each sport
			//The return piece before the AJAX call is part of the promise that RON added earlier
			//I know what a return does now, but not specifically in this case....
				//Looking into pushing the results into an array to display********
			//RONS WAY:
			//return $.ajax
		$.ajax({
			type: "GET",
			beforeSend:appendApiKeyHeader,
			url: "https://api.gettyimages.com/v3/search/images?fields=id,title,thumb,referral_destinations&sort_order=best&phrase=" + mySearchSport
		})

		.done(function(responseData){
	        //STEP 7: Get the image url and store in variable
	        	//This variable may need to be pushed into the array, you might try next
	        	//DO NOT TOUCH THIS NICOLE!!!
	        var imageToBeMatched = responseData.images[0].display_sizes[0].uri
	    })
	} //END of the useSportToCallImage FXN

//STEP 8: Put random sports into the selectedSportsArray
	function captureSportsandPushIntoSelectedSportsArray() {
		gameObject.matchGame.selectedSportsArray = [];
		for (var h = 0; h < gameObject.matchGame[0]; h++) {
				// gameObject.matchGame.selectedSportsArray.push(gameObject.matchGame.sportsArray[chooseSportAtRandom].length);
				gameObject.matchGame.selectedSportsArray.push(numberOfSports);
				console.log(selectedSportsArray + " Selected Array");
				console.log("Working");
		}
		// console.log(selectedSportsArray + " Selected Array");
	} //End of captureSportsandPushIntoSelectedSportsArray FXN

	captureSportsandPushIntoSelectedSportsArray();


	














}) //END of click function???

//STEP 8: Reset the game and clear the board
function resetTheBoard (){
	$("#resetBoard").on("click", function(){
		$("#cardContainer").html("");
		$("#numberOfSportsChosen").val("");
		$("#cardsPerSportChosen").val("");
	})
} //END of reset FXN

resetTheBoard();




}) //End of the document.ready function 




















