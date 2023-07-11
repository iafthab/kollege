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
        <main className="h-screen relative z-0 bg-gradient-to-b from-slate-400 to-slate-300 dark:from-slate-950 dark:to-slate-800 text-slate-950 dark:text-slate-200 flex items-center justify-center flex-col">
          <div
            className=" hidden lg:flex flex-row  w-full h-full -z-[1] items-center justify-center blur-2xl gap-16 absolute "
            name="blur design"
          >
            <span className=" w-[10rem] h-[16rem] bg-violet-900 rounded-r-full inline-block   "></span>
            <span className=" w-[18rem] h-[16rem] bg-violet-900 rounded-full inline-block   "></span>
            <span className=" w-[18rem] h-[16rem] bg-violet-900 rounded-full inline-block   "></span>
            <span className=" w-[18rem] h-[16rem] bg-violet-900 rounded-full inline-block   "></span>
            <span className=" w-[10rem] h-[16rem] bg-violet-900 rounded-l-full inline-block   "></span>
          </div>
          <section className="flex gap-4 z-0  items-center">
            <FaUniversity className="text-[6rem] " />
            <h1 className="font-spectral text-[6rem] text-slate-900  font-semibold  dark:text-slate-200 ">
              K
              <span className="bg-violet-900 dark:bg-violet-500 h-14 w-14 rounded-full inline-block"></span>
              llege
            </h1>
          </section>
          <section className="xl:w-[23%] opacity-70 focus:opacity-100 hover:opacity-100 z-0 md:w-3/5 w-4/5 justify-self-center bg-slate-100 dark:bg-slate-300 rounded-lg pt-4 pb-4 ">
            <div className="flex items-center justify-center ">
              <FaUser className="text-[7rem] border-2 border-solid border-slate-900 rounded-full p-2 m-4 " />
              {/* <AiOutlineUser className="login__user" /> */}
            </div>
            <form
              className="pr-8 pl-8 placeholder:text-slate-200 "
              onSubmit={(e) => handleLogin(e)}
            >
              <input
                className="w-full outline-none focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
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
                className="w-full outline-none focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
                placeholder="password"
                id="password"
                type="password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-slate-800 font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 p-1 border-[1.5px] border-solid block w-full border-violet-900 rounded-md "
                type="submit"
                value="Login"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
              <p className="text-center font-medium text-red-700 whitespace-nowrap overflow-hidden text-ellipsis mb-3">
                {error
                  ? error?.response?.data?.message ||
                    error?.data?.message ||
                    error?.response?.data
                  : ""}
              </p>
              <p className="inline text-slate-600">Click to </p>
              <Link
                className="text-violet-600  hover:underline decoration-2 dark:text-slate-200 font-semibold  "
                to="./reg_teacher"
              >
                Register
              </Link>
            </form>
          </section>
        </main>
      ) : (
        <Navigate to="./dash" />
      )}
    </>
  );
};

export default Login;
