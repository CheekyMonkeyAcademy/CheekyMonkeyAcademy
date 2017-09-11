$(document).ready(function() {

    computerSayThis("Welcome " + gameObject.userSettings.name + " let's play the Shape Game!")
    createMenu();
    var shapeToClick = "Click on the shape" + gameObject.shapesGame.correctShape;

    assignShapeAndCallForGifToDiv();

    function assignShapeAndCallForGifToDiv() {
        clearDivs();
        getFourRandomShapesIntoArray();

        for (i = 0; i < gameObject.shapesGame.fourRandomShapesArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisShape = gameObject.shapesGame.fourRandomShapesArray[i];
            var thisSearchTerm = "shape " + thisShape;

            getGifAndAssignToDiv(thisSearchTerm, thisDiv);
        }
        //assigning winning shape
        gameObject.shapesGame.correctShape = gameObject.shapesGame.fourRandomShapesArray[getRandomFrom(4)];

        computerSayThis("Please click the shape for " + gameObject.shapesGame.correctShape);
    }

    function getFourRandomShapesIntoArray() {
        gameObject.shapesGame.fourRandomShapesArray = [];
        for (i = 0; i < 4; i++) {
            gameObject.shapesGame.fourRandomShapesArray.push(gameObject.shapesGame.shapesArray[getRandomFrom(gameObject.shapesGame.shapesArray.length)]);
        }
    }

    //Game Specific
    $("#clicky-container").on("click", ".gif", function() {
        //Winning Conditions and Game reset
        if ($(this).attr("assigned_thing") === ("shape " + gameObject.shapesGame.correctShape)) {
            getMessageForComputerToSay("success");
            computerSayThis("You clicked the " + gameObject.shapesGame.correctShape);
            assignShapeAndCallForGifToDiv() //game reset with win
        } else {
            getMessageForComputerToSay("failure");
            computerSayThis("That is the " + $(this).attr("assigned_thing"))
        }
    });
}); //end doc.ready function