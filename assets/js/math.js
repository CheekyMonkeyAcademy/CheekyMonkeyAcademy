$(document).ready(function() {

    computerSayThis("Welcome " + gameObject.userSettings.name + " let's play the Math Game!")
    createMenu();

    assignAnswerAndCallForGifToDiv();

    function assignAnswerAndCallForGifToDiv() {
        clearDivs();
        storeAndPopulateNumberVariables();
         getFourRandomAnswersIntoArray("division");
        getFourRandomAnswersIntoArray("substraction");
        getFourRandomAnswersIntoArray("multiplication");
        getFourRandomAnswersIntoArray("addition");

        for (i = 0; i < gameObject.mathGame.fourRandomAnswersArray.length; i++) {
            var thisDiv = "div" + (i);
            var thisAnswer = gameObject.mathGame.fourRandomAnswersArray[i][1];
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
        var thisRandom = getRandomFrom(4);
        console.log(gameObject.mathGame);

        gameObject.mathGame.correctAnswer = gameObject.mathGame.fourRandomAnswersArray[thisRandom][1].toString();
        gameObject.mathGame.correctQuestion = gameObject.mathGame.fourRandomAnswersArray[thisRandom][0];
        // voice active asking kids to find said letter
        computerSayThis("Please click the answer to " + gameObject.mathGame.correctQuestion);
        $("#questionGoesHere").html("Solve this: <br>" + gameObject.mathGame.correctQuestion);
    }

    function getFourRandomAnswersIntoArray(mathType) {
        gameObject.mathGame.fourRandomAnswersArray = [];
        for (i = 0; i < 4; i++) {
            var thisAnswer = 0;
            var thisQuestion = "";
            var questionAnswerArray = [];
            var minNumber = gameObject.mathGame.minNumber;
            var maxNumber = gameObject.mathGame.maxNumber;
            var numberOfNumbers = gameObject.mathGame.numberOfNumbers;

            var addition = true; // TODO stub for later - maybe
            var subtraction = false; // TODO stub for later - maybe
            var multiplication = false; // TODO stub for later - maybe
            var division = false; // TODO stub for later - maybe

            // addition
            for (num = 0; num < numberOfNumbers; num++) {
                var addMe = getRandomFromMinMax(minNumber, maxNumber);
                if (thisQuestion === "") {
                    thisQuestion = "(" + addMe.toString();
                    thisAnswer = addMe;
                }
                else if (mathType === "addition") {
                    thisQuestion = thisQuestion + " + " + addMe.toString();
                    thisAnswer += addMe;
                }
                  else if (mathType === "multiplication") {
                    thisQuestion = thisQuestion + " * " + addMe.toString();
                    thisAnswer = thisAnswer * addMe;
                }
                  else if (mathType === "substraction") {
                    thisQuestion = thisQuestion + " - " + addMe.toString();
                    thisAnswer -= addMe;
                }
                  else if (mathType === "division") {
                    thisQuestion = thisQuestion + " / " + addMe.toString();
                    thisAnswer = thisAnswer / addMe;
                }
            }
            thisQuestion = thisQuestion + ")";

            questionAnswerArray = [thisQuestion, thisAnswer];
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
$(".radio").click(function() {


    if (mathType === "addition") {
     getFourRandomAnswersIntoArray("addition");
    } else if (mathType === "multiplication") {
      getFourRandomAnswersIntoArray("multiplication");
    } else if (mathType === "substraction") {
        getFourRandomAnswersIntoArray("substraction");
    } else if (mathType === "division") {
    getFourRandomAnswersIntoArray("division");
}
      
 
   });
  

    });

       });   