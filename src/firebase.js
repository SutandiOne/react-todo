import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBwvUusJeaxAGf7-Vt5AGwLcg8aN3SFJbQ",
    authDomain: "react-todo-simple.firebaseapp.com",
    databaseURL: "https://react-todo-simple.firebaseio.com",
    projectId: "react-todo-simple",
    storageBucket: "react-todo-simple.appspot.com",
    messagingSenderId: "477787020527",
    appId: "1:477787020527:web:34a8c3f01c896f07f20f1a",
    measurementId: "G-MK664E7CYT"
});

const db = firebaseApp.firestore();

export default db;