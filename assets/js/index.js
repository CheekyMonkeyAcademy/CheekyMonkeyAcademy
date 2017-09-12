$(document).ready(function() {
    computerSayThis("Welcome to Cheeky Monkey Academy, please select a game to play.");
    createMenu();
    //add firebase logic

    var config = {
        apiKey: "AIzaSyDfepSNI19ZoWaOPv52mXSUN4s_W8O8URg",
        authDomain: "cheekymonkeyacademy-1a390.firebaseapp.com",
        databaseURL: "https://cheekymonkeyacademy-1a390.firebaseio.com",
        projectId: "cheekymonkeyacademy-1a390",
        storageBucket: "",
        messagingSenderId: "52825639428"
    };
    firebase.initializeApp(config);

    initApp = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                var displayName = user.displayName;
                var email = user.email;
                var emailVerified = user.emailVerified;
                var photoURL = user.photoURL;
                var uid = user.uid;
                var phoneNumber = user.phoneNumber;
                var providerData = user.providerData;
                user.getIdToken().then(function(accessToken) {
                    document.getElementById('sign-in-status').textContent = 'Signed in';
                    document.getElementById('sign-in').textContent = 'Sign out';
                    document.getElementById('account-details').textContent = JSON.stringify({
                        displayName: displayName,
                        email: email,
                        emailVerified: emailVerified,
                        phoneNumber: phoneNumber,
                        photoURL: photoURL,
                        uid: uid,
                        accessToken: accessToken,
                        providerData: providerData
                    }, null, '  ');
                });
            } else {
                // User is signed out.
                document.getElementById('sign-in-status').textContent = 'Signed out';
                document.getElementById('sign-in').textContent = 'Sign in';
                document.getElementById('account-details').textContent = 'null';
            }
        }, function(error) {
            console.log(error);
        });
    };

    window.addEventListener('load', function() {
        initApp()
    });


});