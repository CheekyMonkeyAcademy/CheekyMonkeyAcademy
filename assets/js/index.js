$(document).ready(function() {
    // computerSayThis("Welcome to Cheeky Monkey Academy, please select a game to play.");
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
    // console.log(database)

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
        console.log("called validate user");
        database.ref().on("value", function(snapshot) {
            if (snapshot.child("users/" + gameObject.userSettings.userId).exists()) {
                console.log("this user exists");
            }
            else {
                console.log("user doesn't exist, let's create them");
                console.log(gameObject.userSettings)
                firebase.database().ref("users/" + gameObject.userSettings.userId).set({
                    displayName: gameObject.userSettings.displayName,
                    email: gameObject.userSettings.email,
                    emailVerified: gameObject.userSettings.emailVerified
                })
            }

        })

        // if they exist, check current displayName, email, and verified email
    }

    function createUserInFirebase() {
        updateUserInFirebase("displayName", gameObject.userSettings.displayName);
        updateUserInFirebase("email", gameObject.userSettings.email);
        updateUserInFirebase("emailVerified", gameObject.userSettings.emailVerified);
    }

    function updateUserInFirebase(fieldToUpdate, valueUpdatedTo) {
        firebase.database().ref("users/" + gameObject.userSettings.userId).update({
            fieldToUpdate: valueUpdatedTo
        });
    }

    // database.on("value", function(snapshot){
    //     console.log(snapshot)
    // });

    // TODO this belongs in a storage area
    // firebase.database().ref('users/' + uid).set({
    //     displayName: inputDisplayName,
    //     email: inputEmail,
    //     profile_picture: photoURL,
    //     uid: uid
    // });

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