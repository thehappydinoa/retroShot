import firebase from "firebase";
import app from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyDzANddFbxs6J-emTC2D64IAqTGiwhH4r0",
  authDomain: "retroshot-6a964.firebaseapp.com",
  databaseURL: "https://retroshot-6a964.firebaseio.com",
  projectId: "retroshot-6a964",
  storageBucket: "retroshot-6a964.appspot.com",
  messagingSenderId: "43848046363",
  appId: "1:43848046363:web:232bff9afa8355afb065be",
  measurementId: "G-9EGHYMMX8W",
};

class Firebase {
  constructor() {
    // Initialize Firebase
    app.initializeApp(firebaseConfig);

    // Initialize Firebase Auth
    this.auth = app.auth();
    this.auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  createUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  signInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  signInWithGoogle = () => this.auth.signInWithPopup(this.googleProvider);

  signOut = () => this.auth.signOut();

  sendPasswordResetEmail = (email) => this.auth.sendPasswordResetEmail(email);

  updatePassword = (password) => this.auth.currentUser.updatePassword(password);
}

export default Firebase;
