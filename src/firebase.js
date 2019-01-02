import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

import firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyD3Eyswe9tVpSh_VLcTP83KrSueop4ae1U',
  authDomain: 'year-in-review-e2780.firebaseapp.com',
  databaseURL: 'https://year-in-review-e2780.firebaseio.com',
  projectId: 'year-in-review-e2780',
  storageBucket: 'year-in-review-e2780.appspot.com',
  messagingSenderId: '100521227283'
};

firebase.initializeApp(config);

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const firestoreDb = firestore;
export const firebaseStorage = firebase.storage();
