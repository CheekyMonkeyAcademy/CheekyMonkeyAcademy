$(document).ready(function() {
    createMenu();
    //add firebase logic

    // FOR TESTING ####################
    // Email Login:  Test@cheekymonkeyacademy.com
    // Password: Test1234
    // FOR TESTING ####################

    var config = {
        apiKey: "AIzaSyDfepSNI19ZoWaOPv52mXSUN4s_W8O8URg",
        authDomain: "cheekymonkeyacademy-1a390.firebaseapp.com",
        databaseURL: "https://cheekymonkeyacademy-1a390.firebaseio.com",
        projectId: "cheekymonkeyacademy-1a390",
        storageBucket: "",
        messagingSenderId: "52825639428"
    };
    firebase.initializeApp(config);

    var database = firebase.database();
    validateUser();
    
    console.log(gameObject.userSettings);
    computerSayThis("Welcome to Cheeky Monkey Academy " + gameObject.userSettings.name + " , please select a game to play.");
    

    window.addEventListener('load', function() {
        initApp()
    });

    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                $("#signOutButton").removeClass("hidden");
                $("#goToLoginPageButton").addClass("hidden");

                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                // var photoURL = user.photoURL;
                var userId = user.uid;
                // var phoneNumber = user.phoneNumber;
                // var providerData = user.providerData;
                user.getIdToken().then(function(accessToken) {
                    document.getElementById('sign-in-status').textContent = 'Signed in';
                    document.getElementById('sign-in').textContent = 'Sign out';
                    document.getElementById('account-details').textContent = JSON.stringify({
                        displayName: displayName,
                        userId: userId
                        // uid:"LBJ8sSuSPAPnYO4D4Z0XNwApcEh2"   
                    }, null, '  ');
                    gameObject.userSettings.userId = user.uid;
                    gameObject.userSettings.displayName = user.displayName;
                    gameObject.userSettings.email = user.email;
                    gameObject.userSettings.emailVerified = user.emailVerified;
                });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Signed out';
                document.getElementById('sign-in').textContent = 'Sign in';
                $("#signOutButton").addClass("hidden");
                $("#goToLoginPageButton").removeClass("hidden");
                document.getElementById('account-details').textContent = 'null';
            }
        }, function(error) {
            console.log(error);
        });
    };

    $("#signOutButton").click(function(){
        signOut();
    });

    function signOut() {
        console.log("clicked on sign out")
        firebase.auth().signOut().then(function() {
            window.location.assign("https://kylekowalski.github.io/CheekyMonkeyAcademy/");
        }).catch(function(error) {
            console.log(error);
        });
    }

    function validateUser() {
        // console.log("called validate user");
        database.ref().on("value", function(snapshot) {
            if (snapshot.child("users/" + gameObject.userSettings.userId).exists()) {
                UpdateUserInFirebase();
            }
            else {
                console.log("user doesn't exist, let's create them");
                console.log(gameObject.userSettings)
                firebase.database().ref("users/" + gameObject.userSettings.userId).set({
                    displayName: gameObject.userSettings.displayName,
                    email: gameObject.userSettings.email,
                    emailVerified: gameObject.userSettings.emailVerified,
                    name: gameObject.userSettings.name,
                    userSex: gameObject.userSettings.userSex,
                    gifMovement: gameObject.userSettings.gifMovement
                });
            }

        });
        // if they exist, check current displayName, email, and verified email
    }

    function createUserInFirebase() {
        console.log("called create user in firebase");
        console.log(gameObject.userSettings);
        if (gameObject.userSettings.userId != "") {
            updateUserFieldInFirebase("displayName", gameObject.userSettings.displayName);
            updateUserFieldInFirebase("email", gameObject.userSettings.email);
            updateUserFieldInFirebase("emailVerified", gameObject.userSettings.emailVerified);
        }
        else {
            console.log("Create User in Firebase called without user Id - error logged");
        }
    }

    function getUserInformationFromFirebase() {
        // TODO implement this
        var myInt = 1;
    }

    function UpdateUserInFirebase() {
        console.log("called update user in firebase");
        console.log(gameObject.userSettings);
        if (gameObject.userSettings.userId != "") {
            // TODO grab the HTML variables
            gameObject.userSettings.name = "Kyle" // THIS IS A TEST ONLY
        

            firebase.database().ref("users/" + gameObject.userSettings.userId).update({
                displayName: gameObject.userSettings.displayName,
                email: gameObject.userSettings.email,
                emailVerified: gameObject.userSettings.emailVerified,
                name: gameObject.userSettings.name,
                userSex: gameObject.userSettings.userSex,
                gifMovement: gameObject.userSettings.gifMovement
            });
        }
        else {
            console.log("Update user in Firebase called without user Id - error logged");
        }
    }

    // this function called from within the deleteModal in html
    // function removeAccount() {
    //     var user = firebase.auth().currentUser;
    //     user.delete().then(function() {
    //         database.child('users/' + uid).remove();
    //         window.location.assign("https://fredlintz5.github.io/hailMinder/");

    //     }).catch(function(error) {
    //         console.log(error);
    //     });
    // }

    // //  open modal which gives user a prompt to confirm delete account
    // $('#deleteModal').click(function(event) {
    //     $('#confirmModal').modal('toggle');
    // });

});