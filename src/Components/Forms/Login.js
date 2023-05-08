import React, { useState } from "react";
import { FaUser, FaUniversity } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "../../config/api/axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { username, password });
      if (response.status === 200) navigate("/dash");
      else setError(response);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="login">
      <section className="login__header">
        <FaUniversity login__uni />
        <h1>Kollege</h1>
      </section>
      <section className="login__form">
        {/* <h2>Login</h2> */}
        <div>
          <FaUser className="login__user" />
          {/* <AiOutlineUser className="login__user" /> */}
        </div>
        <form>
          {/* <label htmlFor="username">Username</label> */}
          <input
            placeholder="username"
            id="username"
            type="text"
            required
            autoComplete="off"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {/* <label htmlFor="password">Password</label> */}
          <input
            placeholder="password"
            id="password"
            type="password"
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" value="Login" onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </form>
        <p className="form__error">
          {error
            ? error?.response?.data?.message ||
              error?.data?.message ||
              error?.response?.data
            : ""}
        </p>
      </section>
    </main>
  );
};

export default Login;
