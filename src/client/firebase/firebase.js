import 'firebase/database';
import firebase from 'firebase/app'
import 'firebase/messaging';

var config = {
  apiKey: "AIzaSyBVIGnRx_8ibT4lkHspo12bpNoeAKt6WFc",
  authDomain: "olxpwa-50939.firebaseapp.com",
  databaseURL: "https://olxpwa-50939.firebaseio.com",
  projectId: "olxpwa-50939",
  storageBucket: "olxpwa-50939.appspot.com",
  messagingSenderId: "62475143885"
};
firebase.initializeApp(config);

export const fb = firebase;
export const database = firebase.database();
export const messaging = firebase.messaging();