import app from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "***REMOVED***",
  authDomain: "***REMOVED***",
  databaseURL: "***REMOVED***",
  projectId: "***REMOVED***",
  storageBucket: "***REMOVED***.appspot.com",
  messagingSenderId: "***REMOVED***",
  appId: "1:***REMOVED***:web:232bff9afa8355afb065be",
  measurementId: "***REMOVED***",
};

app.initializeApp(firebaseConfig);
const auth = app.auth();
auth.setPersistence(app.auth.Auth.Persistence.SESSION);
const googleProvider = new app.auth.GoogleAuthProvider();

export { auth, googleProvider };
export default app;
