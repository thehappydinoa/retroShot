import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./app.css";

import Nav from "../nav";
import Footer from "../footer";
import Home from "../home";
import Login from "../login";

import * as ROUTES from "../../routes";

const App = () => (
  <div className="app">
    <Router>
      <Nav />
      <Route exact path={ROUTES.LANDING}>
        <Home />
      </Route>
      <Route path={ROUTES.LOGIN}>
        <Login />
      </Route>
      <Footer />
    </Router>
  </div>
);

export default App;
