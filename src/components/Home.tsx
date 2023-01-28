import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../utils/auth";

const Home = () => {
  const { user } = useAuth();

  return (
    <section className="Home">
      <h1>Get Your Thoughts Saved On The Web</h1>
      <p>Try it and leave behind your words</p>
      <div>
        {!user && <NavLink to="/logIn">LogIn</NavLink>}
        <NavLink to="/blog">Explore</NavLink>
      </div>
    </section>
  );
};

export default Home;
