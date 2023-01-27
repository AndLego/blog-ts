import React, { FormEvent } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../utils/auth";

const LogIn = () => {
  const username = React.useRef<HTMLInputElement>(null!);
  const { login, user } = useAuth();

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    login(username.current.value);
  };

  if (user) {
    return <Navigate to="/profile" />;
  }

  return (
    <section className="LogIn">
      <h1>Login</h1>

      <form action="" onSubmit={handleForm}>
        <input
          type="text"
          ref={username}
          id="username"
          placeholder="Username"
        />
        <button>Log In</button>
      </form>
    </section>
  );
};

export default LogIn;
