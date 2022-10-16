import * as firebase from 'firebase'

import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCQzmJeeU4Mbg3B5SykfYE38DSFhJ7dUz0",
  authDomain: "e-commerce-website-537a4.firebaseapp.com",
  projectId: "e-commerce-website-537a4",
  storageBucket: "e-commerce-website-537a4.appspot.com",
  messagingSenderId: "253497035948",
  appId: "1:253497035948:web:1b40ce7e30395946b02309"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage }