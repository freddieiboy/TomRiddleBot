import firebase from 'firebase';
import jquery from 'jquery';

const fbase = {
  apiKey: "AIzaSyBdItkUrgHErG2EJ6JWCdup8_R3I1HFgw4",
  authDomain: "tomriddlebot.firebaseapp.com",
  databaseURL: "https://tomriddlebot.firebaseio.com",
  storageBucket: "tomriddlebot.appspot.com"
}

const FirebaseApp = firebase.initializeApp(fbase);
export const Firebase = FirebaseApp;
export const FirebaseDb = FirebaseApp.database();
