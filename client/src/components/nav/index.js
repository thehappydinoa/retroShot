import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import * as ROUTES from "../../routes";
import { useAuthContext, signOut } from "../firebase";

const NavBar = () => {
  const { user } = useAuthContext();
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
        {user ? (
          <>
            <Nav.Link variant="disabled">
              {user.displayName ? `Hi, ${user.displayName}` : user.email}
            </Nav.Link>
            <Nav.Link onClick={signOut} href={ROUTES.LANDING}>Log Out</Nav.Link>
          </>
        ) : (
          <Nav.Link href={ROUTES.LOGIN}>Login</Nav.Link>
        )}
      </Nav>
    </Navbar>
  );
};

export default NavBar;
