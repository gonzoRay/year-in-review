import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebase from "firebase/app";

const config = {
  apiKey: "AIzaSyDTUGaWUU1wO1a4glsIPCY6sP41qCVY1uQ",
  authDomain: "storylines-app.firebaseapp.com",
  databaseURL: "https://storylines-app.firebaseio.com",
  projectId: "storylines-app",
  storageBucket: "storylines-app.appspot.com",
  messagingSenderId: "844264856709"
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const firestoreDb = firestore;
export const firebaseStorage = firebase.storage();
