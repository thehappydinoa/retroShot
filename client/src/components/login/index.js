import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";

import { withFirebase } from "../firebase";
import * as ROUTES from "../../routes";
import './login.css'
const Login = ({ firebase }) => {
  let history = useHistory();
  const [message, setMessage] = useState(null);
  const userRef = useRef(null);
  const passRef = useRef(null);

  const redirect = (user) => {
    console.log(user);
    history.push(ROUTES.LANDING);
  };

  const login = () => {
    firebase
      .signInWithEmailAndPassword(userRef.current.value, passRef.current.value)
      .then(redirect)
      .catch((error) => setMessage(error.message));
  };

  const loginWithGoogle = () => {
    firebase
      .signInWithGoogle()
      .then(redirect)
      .catch((error) => setMessage(error.message));
  };

  const signup = () => {
    firebase
      .createUserWithEmailAndPassword(
        userRef.current.value,
        passRef.current.value
      )
      .then(redirect)
      .catch((error) => setMessage(error.message));
  };

  const handleSubmit = (event) => {
    login();
    event.preventDefault();
    event.stopPropagation();
    // signup();
  };

  return (
    <Container className='loginbox'>
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
                      <Form.Row className="justify-content-md-center centerbtn">
              <Col xs={6} md={6}  className='tr'>
                <Button variant="secondary" className="leftbtn" type="submit">
                Login
              </Button>
              </Col>
              <Col xs={6} md={6} ><Button variant="primary" className="rightbtn" onClick={signup}>
                Sign Up
              </Button></Col>
          </Form.Row>
            {/* <Form.Group>
              <Button variant="secondary" type="submit">
                Login
              </Button>
              <br />
              <Button variant="primary" onClick={signup}>
                Sign Up
              </Button>
            </Form.Group> */}
          </Form>
          <Button className='loginbtn' onClick={loginWithGoogle}>Login with Google</Button>
          {message && (
            <Alert variant={message === "Correct!" ? "success" : "warning"}>
              {message}
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default withFirebase(Login);
