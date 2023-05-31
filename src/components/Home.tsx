import React from "react";
import { NavLink } from "react-router-dom";
import { useAPI } from "../utils/blogAPI";

const Home = () => {
  const { user } = useAPI();

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
