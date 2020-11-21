import React from "react";

import Title from "../title";
import Shot from "../shot";
import Footer from "../footer";
import { withFirebase } from "../firebase";

import "./home.css";

const Home = ({ firebase }) => (
  <div className='home-container'>
    <h1>Home</h1>
    <Title></Title>
    <Shot></Shot>
    {firebase.auth.currentUser?.email || "User Not Signed In"}
    <Footer></Footer>
  </div>
);

export default withFirebase(Home);
