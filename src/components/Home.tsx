import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <section className="Home">
      <h1>Get Your Thoughts Saved On The Web</h1>
      <p>Try it and leave behind your words</p>
      <div>
        <NavLink to="/logIn">LogIn</NavLink>
        <NavLink to="/blog">Explore</NavLink>
      </div>
    </section>
  );
};

export default Home;
