import { AuthContext, AuthProvider, useAuthContext } from "./context";
import app, { auth, googleProvider } from "./config";

const createUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

const signInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

const signOut = () => auth.signOut();

const sendPasswordResetEmail = (email) => auth.sendPasswordResetEmail(email);

const updatePassword = (password) => auth.currentUser.updatePassword(password);

export {
  AuthContext,
  AuthProvider,
  useAuthContext,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithGoogle,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
};

export default app;
