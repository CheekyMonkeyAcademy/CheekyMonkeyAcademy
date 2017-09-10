   $(document).ready(function() {

       createMenu();
       
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

       function getFourRandomShapesIntoArray() {
           gameObject.shapesGame.fourRandomShapesArray = [];
           for (i = 0; i < 4; i++) {
               gameObject.shapesGame.fourRandomShapesArray.push(gameObject.shapesGame.shapesArray[getRandomFrom(gameObject.shapesGame.shapesArray.length)]);
           }
           console.log(gameObject.shapesGame.fourRandomShapesArray);
       }

       //Game Specific
       $("#clicky-container").on("click", ".gif", function() {
           // console.log("you clicked: " + this);
           // console.log(this);
           // console.log($(this).attr("assigned_shape"));
           console.log("Correct_shape " + gameObject.shapesGame.correctShape);

           //Winning Conditions and Game reset
           if ($(this).attr("assigned_shape") === ("shape " + gameObject.shapesGame.correctShape)) {
               //need to update this to be single call from basicFunction success
               computerSayThis("Touchdown! You did great! You clicked the " + gameObject.shapesGame.correctShape);
               assignShapeAndCallForGifToDiv() //game reset with win
           } else {
               //need to update this to be single call from basicFunction success
               computerSayThis("Not this time batman! That was the " + $(this).attr("assigned_shape"))
           }

       });

   }); //end doc.ready function