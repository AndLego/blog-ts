import React, { FormEvent } from "react";
import { useAPI } from "../utils/blogAPI";

const LogIn = () => {
  const username = React.useRef<HTMLInputElement>(null!);
  const{login, user} = useAPI()

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    login(username.current.value);
  };

  // if (user) {
  //   return <Navigate to="/profile" />;
  // }

  return (
    <section className="LogIn">
      <h1>Login</h1>

      <form action="" onSubmit={handleForm}>
        <input
          type="text"
          ref={username}
          id="username"
          placeholder="Username"
          required
          minLength={3}
        />
        <button>Log In</button>
      </form>
    </section>
  );
};

export default LogIn;
