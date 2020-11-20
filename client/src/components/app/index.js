import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Nav from "../nav";
import Home from "../home";
import Login from "../login";

import * as ROUTES from "../../routes";

const App = () => (
  <Router>
    <Nav />
    <Route exact path={ROUTES.LANDING}>
      <Home />
    </Route>
    <Route path={ROUTES.LOGIN}>
      <Login />
    </Route>
  </Router>
);

export default App;
