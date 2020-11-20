import React, { useRef } from "react";
import { useHistory } from "react-router-dom";

import { withFirebase } from "../firebase";
import * as ROUTES from "../../routes";

const Login = ({ firebase }) => {
  let history = useHistory();

  const userRef = useRef(null);
  const passRef = useRef(null);

  const login = () => {
    firebase
      .signInWithEmailAndPassword(userRef.current.value, passRef.current.value)
      .then((user) => {
        console.log(user);
        history.push(ROUTES.LANDING);
      });
    // TODO: Catch already in use
  };

  const signup = () => {
    firebase
      .createUserWithEmailAndPassword(
        userRef.current.value,
        passRef.current.value
      )
      .then((user) => {
        console.log(user);
        history.push(ROUTES.LANDING);
      });
    // TODO: Catch already in use
  };

  return (
    <>
      <h1>Login</h1>
      <form>
        <label>
          Username:
          <input type="text" ref={userRef} />
        </label>
        <br />
        <label>
          Password:
          <input type="text" ref={passRef} />
        </label>
      </form>
      <button onClick={login}>Login</button>
      <button onClick={signup}>Sign Up</button>
    </>
  );
};

export default withFirebase(Login);
