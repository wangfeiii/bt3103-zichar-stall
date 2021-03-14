import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey:"AIzaSyDkSvVXgXu5laq-k-CXCB_vLePQhvzBU1A",
    authDomain: "bt3103-week-6-bef7e.firebaseapp.com",
    projectId: "bt3103-week-6-bef7e",
    storageBucket: "bt3103-week-6-bef7e.appspot.com",
    messagingSenderId: "242455016130",
    appId: "1:242455016130:web:484379d5f381d6f9bc815b",
    measurementId: "G-P4F9LL1ZMH"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;
  