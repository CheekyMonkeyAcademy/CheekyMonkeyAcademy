    
    function openNav() {
        document.getElementById("mySidenav").style.width = "25%";
    }
    //NavBar close page function
    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    $(document).ready(function() {
        //NavBar open page function

        var gameObject = {

            divs: ["div0", "div1", "div2", "div3"],
            fourRandomShapesArray: [],
            //firebase logins
            userSettings: {
                name: "Kyle",
                gifMovement: true, //TODO implement
                userSex: "" // TODO implement

            },
            //
            timer: {

            },
            message: {
                general: {
                    success: [
                        "Great Job!",
                        // "Congratulations!",
                        // "Hooray!",
                        // "Correct!",
                        "Booya!"
                    ],
                    failure: [
                        "Please try again",
                        // "Oops",
                        // "Almost - try another",
                        // "some of these are confusing",
                        "Not quite"
                    ]
                },
                name: {
                    success: [ //TODO finish implementation
                        // "Atta boy " + 
                        //gameObject.userSettings.name //, 
                        // "good job " + gameObject.userSettings.name

                    ],
                    failure: [

                    ]
                },
                male: {
                    success: [
                        "Atta boy!",
                        "good job, son!"
                    ],
                    failure: [
                        "try again young man",
                        "good luck next go young man"
                    ]
                },
                female: {
                    success: [
                        "atta girl!",
                        "good job, young lady"
                    ],
                    failure: [
                        "try again young woman",
                        "good luck next time young lady"
                    ]
                }
            },

        }

        function clearDivs() {
            gameObject.divs.forEach(function(div) {
                $("#" + div).empty();
                console.log("emptying: " + div);
            });
        }

        function getRandomFrom(thisNumber) {
            var returnValue = Math.floor(Math.random() * thisNumber);
            return returnValue;
        }

        function computerSayThis(thingsToSay) {
            var msg = new SpeechSynthesisUtterance(thingsToSay);
            window.speechSynthesis.speak(msg);
        }

    });