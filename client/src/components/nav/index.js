import React from "react";
import { Navbar, Nav } from 'react-bootstrap';

import { withFirebase } from "../firebase";
import * as ROUTES from "../../routes";

const NavBar = ({ firebase }) => {
  return (
    <Navbar bg="light" variant="light">
    <Navbar.Brand href={ROUTES.LANDING}>retroShot</Navbar.Brand>
    <Nav>
      <Nav.Link href={ROUTES.LANDING}>Home</Nav.Link>
      <Nav.Link href={ROUTES.LOGIN}>Login</Nav.Link>
    </Nav>
  </Navbar>
  );
};

export default withFirebase(NavBar);
