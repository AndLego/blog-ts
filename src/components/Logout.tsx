import React, { FormEvent } from "react";
import { useAuth } from "../utils/auth";

const LogOut = () => {
  const { logOut } = useAuth();

  const handleForm = (e: FormEvent) => {
    e.preventDefault();
    logOut();
  };

  return (
    <>
      <section className="LogIn LogOut">
        <h1>Wanna Log Out?</h1>

        <button onClick={handleForm}>Yeah! Bye</button>
      </section>
    </>
  );
};

export default LogOut;
