import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import * as ROUTES from "../../routes";
import { withFirebase } from "../firebase";

const NavBar = ({ firebase }) => {
  return (
    <Navbar bg="light" variant="light">
      <Navbar.Brand href={ROUTES.LANDING}>
        <img
          src="/camera.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="retroShot Logo"
        />{" "}
        retroShot
      </Navbar.Brand>
      <Nav>
        <Nav.Link href={ROUTES.LANDING}>New Game</Nav.Link>
        {firebase.auth.currentUser ? (
          <Nav.Link disabled>{firebase.auth.currentUser.email}</Nav.Link>
        ) : (
          <Nav.Link href={ROUTES.LOGIN}>Login</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default withFirebase(NavBar);
