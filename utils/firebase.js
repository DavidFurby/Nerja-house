import firebase from "firebase/app"
import "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyBqpwUJcnVIf5CMliV6IngNCrVvZazVAVQ",
    authDomain: "nerjahome-c29e0.firebaseapp.com",
    projectId: "nerjahome-c29e0",
    storageBucket: "nerjahome-c29e0.appspot.com",
    messagingSenderId: "845184487041",
    appId: "1:845184487041:web:c5f471f82110e663144780"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

export { firestore };