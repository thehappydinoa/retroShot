import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

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
    <Form>
        <Form.Group controlId="login" onSubmit={login}>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
  );
};

export default withFirebase(Login);
