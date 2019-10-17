// Import stylesheets
import './style.css';
// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

import * as firebaseui from 'firebaseui';

// Document elements
const startRsvpButton = document.getElementById('startRsvp');
const guestbookContainer = document.getElementById('guestbook-container');

const form = document.getElementById('leave-message');
const input = document.getElementById('message');
const guestbook = document.getElementById('guestbook');
const numberAttending = document.getElementById('number-attending');
const rsvpYes = document.getElementById('rsvp-yes');
const rsvpNo = document.getElementById('rsvp-no');
const meetupInfo = document.getElementById('description-container');
const specialNote = document.getElementById('guestbook-container');

var rsvpListener = null;
var guestbookListener = null;

// Add Firebase project configuration object here


  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBGMFd1uIIWqDxMiFzbdA_9JomKPaDDABQ",
    authDomain: "codelab-meetup-app.firebaseapp.com",
    databaseURL: "https://codelab-meetup-app.firebaseio.com",
    projectId: "codelab-meetup-app",
    storageBucket: "codelab-meetup-app.appspot.com",
    messagingSenderId: "33384112726",
    appId: "1:33384112726:web:ba827301009e5b355811f7"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


// var firebaseConfig = {};

// firebase.initializeApp(firebaseConfig);

// FirebaseUI config
const uiConfig = {
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  signInOptions: [
    // Email / Password Provider.
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl){
      // Handle sign-in.
      // Return false to avoid redirect.
      return false;
    }
  }
};
// Initialize the FirebaseUI widget using Firebase
const ui = new firebaseui.auth.AuthUI(firebase.auth());

// Listen to RSVP button clicks
// Called when the user clicks the RSVP button
startRsvpButton.addEventListener("click",
 () => {
    if (firebase.auth().currentUser) {
      // User is signed in; allows user to sign out
      
      firebase.auth().signOut();
    } else {
      // No user is signed in; allows user to sign in
      ui.start("#firebaseui-auth-container", uiConfig);
    }
});

// Listen to the current Auth state
firebase.auth().onAuthStateChanged((user)=> {
  if (user) {
    meetupInfo.style.display = "block";
    specialNote.style.display = "block";
    guestbookContainer.style.display = "block";
    startRsvpButton.textContent = "LOGOUT";
  }
  else {
    meetupInfo.style.display = "none";
    specialNote.style.display = "none";
    guestbookContainer.style.display = "none";
    startRsvpButton.textContent = "RSVP";
  }
});
