$(document).ready(function() {

    computerSayThis("Welcome " + gameObject.userSettings.name + " let's play the Numbers Game!");
    createMenu();

    assignNumberAndCallForGifToDiv();

    function assignNumberAndCallForGifToDiv() {
        clearDivs();
        getFourRandomNumbersIntoArray();

        for (i = 0; i < gameObject.numbersGame.fourRandomNumbersArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisNumber = gameObject.numbersGame.fourRandomNumbersArray[i]
            var thisSearchTerm = "" + thisNumber;

            getGifAndAssignToDiv(thisSearchTerm, thisDiv);
        }
        // assign our 'winning' letter for this round
        gameObject.numbersGame.correctNumber = gameObject.numbersGame.fourRandomNumbersArray[getRandomFrom(4)];
       
       getWikipediaEntry(gameObject.numbersGame.correctNumber);
       
        computerSayThis("Please click the image for " + gameObject.numbersGame.correctNumber);
    }

    function getFourRandomNumbersIntoArray() {
        gameObject.numbersGame.fourRandomNumbersArray = [];
        for (i = 0; i < 4; i++) {
            gameObject.numbersGame.fourRandomNumbersArray.
            	push(gameObject.numbersGame.numbersArray[
            	getRandomFrom(gameObject.numbersGame.numbersArray.length)]);
            // TODO this can duplicate letters - do we want to eliminate that?  Or is a duplicate letter such a good thing?
            // If we have randomized gifs inside of a letter I would almost leave the 'mulitple success' in.  Sometimes mulitple things ARE true in life.
        }
    }

    $("#clicky-container").on("click", ".gif", function() {
        if ($(this).attr("assigned_thing") === ("" + gameObject.numbersGame.correctNumber)) {
            getMessageForComputerToSay("success");
            computerSayThis("You clicked the " + gameObject.numbersGame.correctNumber);
            assignNumberAndCallForGifToDiv();
        } else {
            getMessageForComputerToSay("failure");
            computerSayThis("That is the " + $(this).attr("assigned_thing"));
        }
    });
});