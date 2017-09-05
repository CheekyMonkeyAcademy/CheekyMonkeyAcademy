//ApplicationRobert Rollner 
//Key: e24ad6a7dkbrsux488zarzzv 
//Secret: DPNf2zP9ad6bmw7XSzSepasNwKZ3CKCn7VmmyBdk2sZRd 
//Status: active Created: 30 seconds ago
//Key Rate Limits
//5	Calls per second
//Unlimited	Calls per day



$(document).ready(function() {
    var gameObject = {
        divs: ["div0", "div1", "div2", "div3"],
        timer: {

        },
        shapesGame: {
            correctShape: "Square",
            fourRandomShapesArray: [],
            shapesArray: ["Square", "Circle", "Triangle", "Rectangle", "Oval", "Diamond", "Polygon", "Sphere", "Rhombus"]
        }
    }

    var shapeToClick = "Click on the shape" + gameObject.shapesGame.correctShape;

    assignShapeAndCallForGifToDiv();

    function assignShapeAndCallForGifToDiv() {
    	clearDivs(); //Need to create a Div clearing function
    	getFourRandomShapesIntoArray();

    	for (i = 0; i < gameObject.shapesGame.fourRandomShapesArray.length; i++) {
    		var thisDiv = "div" + (i);
    		var thisShape = gameObject.shapesGame.fourRandomShapesArray[i];
    		var thisSearchTerm = "shape " + thisShape;

    		console.log("Div: " + thisDiv + " assigned shape " + thisShape + " using search: >" + thisSearchTerm + "<");

    		getShapeAndAssignToDiv(thisSearchTerm, thisDiv);
    	}
    	//assigning winning shape
    	gameObject.shapesGame.correctShape = gameObject.shapesGame.fourRandomShapesArray[getRandomFrom(4)];
    	//voice prompt for shape
    	computerSayThis("Please click on the image for the shape " + gameObject.shapesGame.correctShape);

    }

    function clearDivs() {
    	gameObject.divs.forEach(function(div) {
    		$("#" + div).empty();
    		console.log("emptying: " + div);
    	});
    }

    function getFourRandomShapesIntoArray() {
    	gameObject.shapesGame.fourRandomShapesArray = [];
    	for (i = 0; i < 4; i++) {
    		gameObject.shapesGame.fourRandomShapesArray.push(gameObject.shapesGame.shapesArray[getRandomFrom(9)]);
    	}
    	console.log(gameObject.shapesGame.fourRandomShapesArray);
    }

    function getRandomFrom(thisNumber) {
    	var returnValue = Math.floor(Math.random() * thisNumber);
    	return returnValue;
    }

    function computerSayThis(thingsToSay) {
    	var msg = new SpeechSynthesisUtterance(thingsToSay);
    	window.speechSynthesis.speak(msg);
    }

    function getShapeAndAssignToDiv(searchTerm, div) {
    	var resultsObject = {},
    	var queryURL = "https://api.gettyimages.com/v3/search/images/creative?phrase=" + searchTerm + "&api_key=e24ad6a7dkbrsux488zarzzv"

    	$.ajax({
    		url: queryURL,
    		method: "GET"
    	}).done(function(response) {
    		resultsObject = response.data;

    		$.each(resultsObject, function(key, value) {
    			var ImageURL = value.
    		})
    	})
    }
}); //end doc.ready function