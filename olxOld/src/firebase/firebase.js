import 'firebase/database';
import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/storage';

var config = {
    apiKey: "AIzaSyBVIGnRx_8ibT4lkHspo12bpNoeAKt6WFc",
    authDomain: "olxpwa-50939.firebaseapp.com",
    databaseURL: "https://olxpwa-50939.firebaseio.com",
    projectId: "olxpwa-50939",
    storageBucket: "",
    messagingSenderId: "62475143885"
  };
  firebase.initializeApp(config);

export const fb = firebase;
export const database = firebase.database();
export const auth = firebase.auth();
export const storage = firebase.storage();
