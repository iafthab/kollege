import React, { useContext, useState } from "react";
import { FaUser, FaUniversity } from "react-icons/fa";
// import { AiOutlineUser } from "react-icons/ai";
import { Link, Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", { username, password });
      await setUser(response.data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <>
      {!user?._id ? (
        <main className="login">
          <section className="login__header">
            <FaUniversity />
            <h1>Kollege</h1>
          </section>
          <section className="login__form">
            <div>
              <FaUser className="login__user" />
              {/* <AiOutlineUser className="login__user" /> */}
            </div>
            <form onSubmit={(e) => handleLogin(e)}>
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
              <input
                placeholder="password"
                id="password"
                type="password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                value="Login"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
              <Link to="./reg_teacher">Register</Link>
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
      ) : (
        <Navigate to="./dash" />
      )}
    </>
  );
};

export default Login;
