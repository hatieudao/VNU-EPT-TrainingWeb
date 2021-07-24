import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyABjAH9cZqQ27tXrHetZ8okfA6eeJKyxyA",
    authDomain: "vnu-training.firebaseapp.com",
    projectId: "vnu-training",
    storageBucket: "vnu-training.appspot.com",
    messagingSenderId: "128626367927",
    appId: "1:128626367927:web:e3a3b864410b4caf785c32"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const provider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth, provider, facebookProvider };