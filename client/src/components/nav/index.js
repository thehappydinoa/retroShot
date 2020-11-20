import React from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../firebase";
import * as ROUTES from "../../routes";

const Nav = ({ firebase }) => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.LOGIN}>Login</Link>
        </li>
      </ul>
    </div>
  );
};

export default withFirebase(Nav);
