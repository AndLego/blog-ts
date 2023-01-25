import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

const LogIn = () => {
  const username = React.useRef("");
  const { login, user } = useAuth();

  const handleForm = (e) => {
    e.preventDefault();
    login(username.current.value);
  };

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <>
      <h1>Login</h1>

      <form action="" onSubmit={handleForm}>
        <label htmlFor="username">Username</label>
        <input type="text" ref={username} id="username" />
        <button>Log In</button>
      </form>
    </>
  );
};

export default LogIn;
