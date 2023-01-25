import React from "react";
import { useAuth } from "../utils/auth";

const LogOut = () => {
  const { logout } = useAuth();

  const handleForm = (e) => {
    e.preventDefault();
    logout();
  };

  return (
    <>
      <h1>Wanna Log Out?</h1>

      <form action="" onSubmit={handleForm}>
        <label htmlFor="">Username</label>

        <button>Log Out</button>
      </form>
    </>
  );
};

export default LogOut;