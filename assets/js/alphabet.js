$(document).ready(function() {

    computerSayThis("Welcome " + gameObject.userSettings.name + " let's play the Alphabet Game!")
    createMenu();
    // var letterToClick = "Click on " + gameObject.alphabetGame.correctLetter;

    assignLetterAndCallForGifToDiv();

    function assignLetterAndCallForGifToDiv() {
        clearDivs();
        getFourRandomLettersIntoArray();

        for (i = 0; i < gameObject.alphabetGame.fourRandomLettersArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisLetter = gameObject.alphabetGame.fourRandomLettersArray[i];
            var thisSearchTerm = "alphabet letter " + thisLetter;

            getGifAndAssignToDiv(thisSearchTerm, thisDiv);
        }
        // assign our 'winning' letter for this round
        gameObject.alphabetGame.correctLetter = gameObject.alphabetGame.fourRandomLettersArray[getRandomFrom(4)];
        // voice active asking kids to find said letter
        computerSayThis("Please click the image for " + gameObject.alphabetGame.correctLetter);
    }

    function getFourRandomLettersIntoArray() {
        gameObject.alphabetGame.fourRandomLettersArray = [];
        for (i = 0; i < 4; i++) {
            gameObject.alphabetGame.fourRandomLettersArray.push(gameObject.alphabetGame.alphabetArray[getRandomFrom(26)]);
            // TODO this can duplicate letters - do we want to eliminate that?  Or is a duplicate letter such a good thing?
            // If we have randomized gifs inside of a letter I would almost leave the 'mulitple success' in.  Sometimes mulitple things ARE true in life.
        }
    }

    $("#clicky-container").on("click", ".gif", function() {
        if ($(this).attr("assigned_thing") === ("alphabet letter " + gameObject.alphabetGame.correctLetter)) {
            getMessageForComputerToSay("success");
            computerSayThis("You clicked the " + gameObject.alphabetGame.correctLetter);
            assignLetterAndCallForGifToDiv();
        } else {
            getMessageForComputerToSay("failure");
            computerSayThis("That is the " + $(this).attr("assigned_thing"));
        }
    });
});