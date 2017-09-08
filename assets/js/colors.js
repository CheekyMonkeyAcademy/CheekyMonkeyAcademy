$(document).ready(function(){


// Create a click event that will start the game
$("#gameStart").hide();
$("#start-game-btn").on("click", function(){
	$("#gameStart").show();   
	$("#start-game-btn").hide();                                                                      
}) //End of click function for start game button

//Create a click and drag event for the current image on the screen
	//drag, dragstart, dragenter, dragexit, dragleave, dragover
	var dragImg = $(".greenImages");
	var dropLoc = $(".matchingBox");

dragImg.on("dragstart", function(event) { //This event will fire 
	//when the user starts dragging the image
	event.originalEvent.dataTransfer.setData('key', $(this).attr("color"));
	//('key', 'blueCar');
	console.log("its dragging!");
	console.log($(this).attr("color"));
});

dropLoc.on("dragover", function(event) {
	event.preventDefault();
	//This event will fire when the element
	//selection is being dragged over to the valid drop location
	console.log("it's dragover");
})

dropLoc.on("drop", function(event){
	//This will be fired when the user 
	//drops the dragged item to the drag location
	event.preventDefault();
	//Add in the next line of code to make sure the user
		//puts the picture in the correct box
		var droppedImage = event.originalEvent.dataTransfer.getData('key');
		if(droppedImage === $(this).attr("color")) {
			
			console.log("It's Dropped!!");
			console.log(droppedImage);
			// var myDroppedImage = $(this).attr("id"); //took id out of parenthesis
			var newImageElement = $('img');
			dropLoc.append(newImageElement);

		} else {
			alert("Try Again!");
			}
		})

	//Create a conditional statement where the player must drag
	//the image to the correct box
		//if the image is put in the correct box
			//it will stack on top of the box and previous images
		//if the image was not matched to correct box
			//The image will bounce back to the imageDisplayBox
			//And alert the player to try again
//Create a for loop for the computer to display on the screen
	//all the images in the array in a random order in the imageDiv class
//Create an








});