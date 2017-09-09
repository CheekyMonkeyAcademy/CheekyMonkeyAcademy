$(document).ready(function(){


// Create a click event that will start the game
$("#gameStart").hide();
$("#start-game-btn").on("click", function(){
	$("#gameStart").show();   
	// $("#start-game-btn").hide();  
	$("#instructions").hide();  
	$("body").css("background-color","#FEFBF7");                                                                  
}) //End of click function for start game button

//Create a click and drag event for the current image on the screen
	//drag, dragstart, dragenter, dragexit, dragleave, dragover
	var dragImg = $(".images");
	var dropLoc = $(".matchingBox");

dragImg.on("dragstart", function(event) { //This event will fire 
	//when the user starts dragging the image
	event.originalEvent.dataTransfer.setData("color", $(this).attr("color"));
	event.originalEvent.dataTransfer.setData("src", $(this).attr("src"));
	event.originalEvent.dataTransfer.setData("id", $(this).attr("id"));
	console.log("its dragging!");
	console.log($(this).attr("color"));
	//ADDING HELPER function to draggable element?????
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
		var droppedImageColor = event.originalEvent.dataTransfer.getData("color");
		var droppedImageSrc = event.originalEvent.dataTransfer.getData("src");
		var droppedImageId = event.originalEvent.dataTransfer.getData("id");
		console.log(droppedImageSrc);
		if(droppedImageColor === $(this).attr("color")) {
			if ($(this).attr("status") === "empty") {
				$(this).attr("status", "filled");
				$("#" + droppedImageId).hide();
				console.log($(this).attr("status")); //This works!
				var newImg = $("<img>");
				newImg.attr("src", droppedImageSrc);
				var parentDivColor = $(this);
				parentDivColor.append(newImg);
				console.log(parentDivColor);
				console.log("It's Dropped!!");

				//Get dropped image to disappear from the imageContainer
				
				// dragImg.attr("visibility", "hidden").hide();
					//This makes all the images inside the imageContainer disappear

			//End of line 44 if statement is at line 53
			} else if ($(this).attr("status") === "filled") {
				alert("Choose another box");

			} //End of inner else statement on 53
		//End of line 43 if statement is on line 56
		} else {
			alert("try again");
		}
	})//This is the end of the on drop function on line 34
			











});