import React from "react";
import firebase from "firebase";

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCkExbaZ9VsUkwNdN-1cdBqZzYi_vB2SIs",
    authDomain: "barterbar-dfde6.firebaseapp.com",
    databaseURL: "https://barterbar-dfde6.firebaseio.com",
    projectId: "barterbar-dfde6",
    storageBucket: "barterbar-dfde6.appspot.com",
    messagingSenderId: "195317337765"
};
firebase.initializeApp(config);

export default firebase;