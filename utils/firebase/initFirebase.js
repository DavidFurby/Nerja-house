
import firebase from 'firebase/app'
// the below imports are option - comment out what you don't need
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
import 'firebase/analytics'
import 'firebase/performance'

console.log(process.env.NEXT_PUBLIC_FIREBASE_API_KEY)
console.log("AIzaSyCLM_mIpoijNXrljWj0i9WNTBskunkDNc8")
var firebaseConfig = {
    apiKey: "AIzaSyCLM_mIpoijNXrljWj0i9WNTBskunkDNc8",
    authDomain: "nerjahome-a4486.firebaseapp.com",
    projectId: "nerjahome-a4486",
    storageBucket: "nerjahome-a4486.appspot.com",
    messagingSenderId: "165010391934",
    appId: "1:165010391934:web:a1a42b11c287b561dd292f",
    measurementId: "G-B6P624Q9M3"
  };

export default function initFirebase() {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig)
     
    }
}