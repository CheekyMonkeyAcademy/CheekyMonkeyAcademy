//ApplicationRobert Rollner Key: e24ad6a7dkbrsux488zarzzv 
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
    	}
    }

}); //end doc.ready function