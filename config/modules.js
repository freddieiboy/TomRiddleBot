import firebase from 'firebase';
import jquery from 'jquery';
import { fbase } from './default';

const FirebaseApp = firebase.initializeApp(fbase);
export const Firebase = FirebaseApp;
//TODO: add auth()
export const FirebaseDb = FirebaseApp.database();
