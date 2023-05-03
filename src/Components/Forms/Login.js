import React from "react";
import { FaUser } from "react-icons/fa";

const Login = () => {
  return (
    <section>
      <h2>Login</h2>
      <FaUser />
      <form>
        <label htmlFor="username">Username</label>
        <input id="username" type="text" />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" />
        <button type="submit" value="Login">
          Login
        </button>
      </form>
    </section>
  );
};

export default Login;
