$(document).ready(function() {

    computerSayThis("Welcome " + gameObject.userSettings.name + " let's play the Math Game!");
    createMenu();

    assignAnswerAndCallForGifToDiv();

    function assignAnswerAndCallForGifToDiv() {
        clearDivs();
        storeAndPopulateNumberVariables();
        getFourRandomAnswersIntoArray();

        for (i = 0; i < gameObject.mathGame.fourRandomAnswersArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisAnswerA = gameObject.mathGame.fourRandomAnswersArray[i][1];
            var thisAnswerM = gameObject.mathGame.fourRandomAnswersArray[i][1];
            var thisAnswerD = gameObject.mathGame.fourRandomAnswersArray[i][1];
            var thisAnswerS = gameObject.mathGame.fourRandomAnswersArray[i][1];
            var randomAnimal = gameObject.animalGame.animalArray[getRandomFrom(gameObject.animalGame.animalArray.length)];
            var thisSearchTerm = "nature " + randomAnimal;

            getGifAndAssignToDiv(thisSearchTerm, thisDiv);

            var thisParentDiv = $("#" + thisDiv);
            var newFloatingDiv = $("<div>");
            newFloatingDiv.attr("class", "absolute clickable");
            newFloatingDiv.attr("assigned_thing", gameObject.mathGame.fourRandomAnswersArray[i][1]);
            newFloatingDiv.html(thisAnswerA);
            newFloatingDiv.html(thisAnswerM);
            newFloatingDiv.html(thisAnswerD);
            newFloatingDiv.html(thisAnswerS);
            thisParentDiv.prepend(newFloatingDiv);
        }
        // assign our 'winning' letter for this round
        var thisRandom = getRandomFrom(4);
        console.log(gameObject.mathGame);

        gameObject.mathGame.correctAnswer = gameObject.mathGame.fourRandomAnswersArray[thisRandom][1].toString();
        gameObject.mathGame.correctQuestion = gameObject.mathGame.fourRandomAnswersArray[thisRandom][0];
        // voice active asking kids to find said letter
        computerSayThis("Please click the answer to " + gameObject.mathGame.correctQuestion);
        $("#questionGoesHere").html("Solve this: <br>" + gameObject.mathGame.correctQuestion);
    }

    function getFourRandomAnswersIntoArray() {
        gameObject.mathGame.fourRandomAnswersArray = [];
        for (i = 0; i < 4; i++) {
            var thisAnswerA = 0;
            var thisAnswerM = 1;
            var thisAnswerD = 1;
            var thisAnswerS = 0;
            var thisQuestion = "";
            var questionAnswerArray = [];
            var minNumber = gameObject.mathGame.minNumber;
            var maxNumber = gameObject.mathGame.maxNumber;
            var numberOfNumbers = gameObject.mathGame.numberOfNumbers;

            // var addition = true; // TODO stub for later - maybe
            // var subtraction = false; // TODO stub for later - maybe
            // var multiplication = false; // TODO stub for later - maybe
            // var division = false; // TODO stub for later - maybe

            // addition
            for (num = 0; num < numberOfNumbers; num++) {
                var addMeA = getRandomFromMinMax(minNumber, maxNumber);
                thisAnswerA += addMeA;
                if (thisQuestion === "") {
                    thisQuestion = "(" + addMeA.toString();
                }
                else {
                    thisQuestion = thisQuestion + " + " + addMeA.toString();
                }
            }
            thisQuestion = thisQuestion + ")";

            questionAnswerArray = [thisQuestion, thisAnswerA];


           
            // substraction
            for (num = 0; num < numberOfNumbers; num++) {
                var addMeS = getRandomFromMinMax(minNumber, maxNumber);
                thisAnswerS -= addMeS;
                if (thisQuestion === "") {
                    thisQuestion = "(" + addMeS.toString();
                }
                else {
                    thisQuestion = thisQuestion + " - " + addMeS.toString();
                }
            }
            thisQuestion = thisQuestion + ")";

            questionAnswerArray = [thisQuestion, thisAnswerS];

 // multiplication
            for (num = 0; num < numberOfNumbers; num++) {
                var addMeM = getRandomFromMinMax(minNumber, maxNumber);
                thisAnswerM = thisAnswerM * addMeM;
                if (thisQuestion === "") {
                    thisQuestion = "(" + addMeM.toString();
                }
                else {
                    thisQuestion = thisQuestion + " * " + addMeM.toString();
                }
            }
            thisQuestion = thisQuestion + ")";

            questionAnswerArray = [thisQuestion, thisAnswerM];

            // division
            for (num = 0; num < numberOfNumbers; num++) {
                var addMeD = getRandomFromMinMax(minNumber, maxNumber);
                thisAnswerD /= addMeD;
                if (thisQuestion === "") {
                    thisQuestion = "(" + addMeD.toString();
                }
                else {
                    thisQuestion = thisQuestion + " / " + addMeD.toString();
                }
            }
            thisQuestion = thisQuestion + ")";

            questionAnswerArray = [thisQuestion, thisAnswerD];

            gameObject.mathGame.fourRandomAnswersArray.push(questionAnswerArray);
            // end addition (others not implemented yet)
        }
    }

    function storeAndPopulateNumberVariables() {
        var minNumber = $("#minNumber").val();
        var maxNumber = $("#maxNumber").val();
        var numberOfNumbers = $("#numberOfNumbers").val();

        console.log(gameObject.mathGame);
        if (minNumber == "") {
            console.log("min empty");
            $("#minNumber").val(gameObject.mathGame.minNumber);
        }
        else {
            console.log("min else");
            gameObject.mathGame.minNumber = parseInt($("#minNumber").val());
        }

        if (maxNumber == "") {
            $("#maxNumber").val(parseInt(gameObject.mathGame.maxNumber));
        }
        else {
            gameObject.mathGame.maxNumber = parseInt($("#maxNumber").val());
        }

        if (numberOfNumbers == "") {
            $("#numberOfNumbers").val(gameObject.mathGame.numberOfNumbers);
        }
        else {
            gameObject.mathGame.numberOfNumbers = parseInt($("#numberOfNumbers").val());
        }
        // TODO store these in the user variables
    }

    $("#clicky-container").on("click", ".clickable", function() {
        console.log(gameObject.mathGame);
        if ($(this).attr("assigned_thing") === (gameObject.mathGame.correctAnswer)) {
            getMessageForComputerToSay("success");
            computerSayThis("You clicked the " + gameObject.mathGame.correctAnswer);
            assignAnswerAndCallForGifToDiv();
        } else {
            getMessageForComputerToSay("failure");
        }
    });
});