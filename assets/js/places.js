$(document).ready(function() {
    computerSayThis("Welcome " + gameObject.userSettings.name + " let's find the places in this Game!");
    createMenu();

    var placesToClick = "Click on the place" + gameObject.placesGame.correctPlace;

    assignPlaceAndCallForGifToDiv();

    function assignPlaceAndCallForGifToDiv() {
        clearDivs();
        getFourRandomPlacesIntoArray();

        for (i = 0; i < gameObject.placesGame.fourRandomPlacesArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisPlace = gameObject.placesGame.fourRandomPlacesArray[i];
            var thisSearchTerm = "place " + thisPlace;

            getGifAndAssignToDiv(thisSearchTerm, thisDiv);
        }

        gameObject.placesGame.correctPlace = gameObject.placesGame.fourRandomPlacesArray[getRandomFrom(4)];

        getWikipediaEntry(gameObject.placesGame.correctPlace);

        computerSayThis("Please click on the image of " + gameObject.placesGame.correctPlace);
    }

    function getFourRandomPlacesIntoArray() {
        gameObject.placesGame.fourRandomPlacesArray = [];
        for (i = 0; i < 4; i++) {
            gameObject.placesGame.fourRandomPlacesArray.push(gameObject.placesGame.placesArray[getRandomFrom(gameObject.placesGame.placesArray.length)]);
        }
        console.log(gameObject.placesGame.fourRandomPlacesArray);
    }


    $("#clicky-container").on("click", ".gif", function() {
        if ($(this).attr("assigned_thing") === ("place " + gameObject.placesGame.correctPlace)) {
            computerSayThis("That place looks nice! That's " + gameObject.placesGame.correctPlace);
            assignPlaceAndCallForGifToDiv()
        } else {
            getMessageForComputerToSay("failure");
            computerSayThis("That is the " + $(this).attr("assigned_thing"));
        }
    })

}); //end of logic