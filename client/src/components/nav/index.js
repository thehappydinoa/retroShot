import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../routes";

const Nav = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.LOGIN}>Log In</Link>
      </li>
    </ul>
  </div>
);

export default Nav;
