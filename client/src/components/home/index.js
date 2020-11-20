import React from "react";

import { withFirebase } from "../firebase";

const Home = ({ firebase }) => (
  <div>
    <h1>Home</h1>
    {firebase.auth.currentUser?.email || "User Not Signed In"}
  </div>
);

export default withFirebase(Home);
