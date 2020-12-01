import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

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

  const handleSubmit = (event) => {
    login();
    event.preventDefault();
    event.stopPropagation();
    // signup();
  };

  return (
    <Container>
      <Row className="justify-content-md-center" style={{ paddingTop: "2rem" }}>
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="login">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                autoComplete="email"
                ref={userRef}
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                autoComplete="current-password"
                ref={passRef}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="secondary" type="submit">
                Login
              </Button>
              <br />
              <Button variant="primary" onClick={signup}>
                Sign Up
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default withFirebase(Login);
