$(document).ready(function() {

    computerSayThis("Welcome " + gameObject.userSettings.name + " let's play the Math Game!")
    createMenu();

    assignAnswerAndCallForGifToDiv();

    function assignAnswerAndCallForGifToDiv() {
        clearDivs();
        getFourRandomAnswersIntoArray();

        for (i = 0; i < gameObject.mathGame.fourRandomAnswersArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisAnswer = gameObject.mathGame.fourRandomAnswersArray[i][1]
            var randomAnimal = gameObject.animalGame.animalArray[getRandomFrom(gameObject.animalGame.animalArray.length)];
            var thisSearchTerm = "nature " + randomAnimal;

            getGifAndAssignToDiv(thisSearchTerm, thisDiv);

            var thisParentDiv = $("#" + thisDiv);
            var newFloatingDiv = $("<div>");
            newFloatingDiv.attr("class", "absolute clickable");
            newFloatingDiv.attr("assigned_thing", gameObject.mathGame.fourRandomAnswersArray[i][1]);
            newFloatingDiv.html(thisAnswer);
            thisParentDiv.prepend(newFloatingDiv);
        }
        // assign our 'winning' letter for this round
        var thisRandom = getRandomFrom(4)
        console.log(gameObject.mathGame)

        gameObject.mathGame.correctAnswer = gameObject.mathGame.fourRandomAnswersArray[thisRandom][1].toString();
        gameObject.mathGame.correctQuestion = gameObject.mathGame.fourRandomAnswersArray[thisRandom][0]
        // voice active asking kids to find said letter
        computerSayThis("Please click the answer to " + gameObject.mathGame.correctQuestion);
        $("#questionGoesHere").html("Solve this: " + gameObject.mathGame.correctQuestion)
    }

    function getFourRandomAnswersIntoArray() {
        gameObject.mathGame.fourRandomAnswersArray = [];
        for (i = 0; i < 4; i++) {
            var thisAnswer = 0;
            var thisQuestion = "";
            var questionAnswerArray = [];
            var minNumber = gameObject.mathGame.minimumNumber;
            var maxNumber = gameObject.mathGame.maximumNumber;
            var numberOfNumbers = gameObject.mathGame.numberOfNumbers;

            var addition = true; // TODO stub for later - maybe
            var subtraction = false; // TODO stub for later - maybe
            var multiplication = false; // TODO stub for later - maybe
            var division = false; // TODO stub for later - maybe

            // addition
            for (num = 0; num < numberOfNumbers; num++) {
                var addMe = getRandomFromMinMax(minNumber, maxNumber)
                thisAnswer += addMe;
                if (thisQuestion === "") {
                    thisQuestion = "(" + addMe.toString();
                }
                else {
                    thisQuestion = thisQuestion + " + " + addMe.toString();
                }
            }
            thisQuestion = thisQuestion + ")";

            questionAnswerArray = [thisQuestion, thisAnswer]
            gameObject.mathGame.fourRandomAnswersArray.push(questionAnswerArray);
            console.log("final answers: " + gameObject.mathGame.fourRandomAnswersArray);
            // end addition (others not implemented yet)
        }
    }

    $("#clicky-container").on("click", ".clickable", function() {
        console.log(gameObject.mathGame)
        if ($(this).attr("assigned_thing") === (gameObject.mathGame.correctAnswer)) {
            getMessageForComputerToSay("success");
            computerSayThis("You clicked the " + gameObject.mathGame.correctAnswer);
            assignAnswerAndCallForGifToDiv();
        } else {
            getMessageForComputerToSay("failure");
        }
    });
});