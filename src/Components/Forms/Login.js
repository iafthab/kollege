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
        <main className="relative z-0 flex h-screen flex-col items-center justify-center bg-gradient-to-b from-slate-400 to-slate-300 text-slate-950 dark:from-slate-800 dark:to-slate-950 dark:text-slate-300">
          <div
            className="absolute -z-[1]  flex  h-full w-full flex-col items-center justify-center gap-16 blur-[47px] md:blur-2xl lg:flex-row"
            name="blur design"
          >
            <span className=" inline-block h-[16rem] w-[10rem] rounded-r-full bg-violet-900"></span>
            <span className=" inline-block h-[16rem] w-[18rem] rounded-full bg-violet-900"></span>
            <span className=" inline-block h-[16rem] w-[18rem] rounded-full bg-violet-900"></span>
            <span className=" inline-block h-[16rem] w-[18rem] rounded-full bg-violet-900"></span>
            <span className=" inline-block h-[16rem] w-[10rem] rounded-l-full bg-violet-900"></span>
          </div>
          <section className="z-0 flex items-center gap-2 whitespace-nowrap text-5xl sm:text-6xl md:text-8xl lg:gap-4 xl:text-[6rem]">
            <FaUniversity />
            <h1 className="font-spectral font-semibold  text-slate-900  dark:text-slate-300 ">
              K
              <span className="inline-block h-8 w-8 rounded-full bg-violet-900 dark:bg-violet-600 sm:h-10 sm:w-10 md:h-14 md:w-14 xl:h-14 xl:w-14"></span>
              llege
            </h1>
          </section>
          <section className="z-0 mt-4 w-[65%] justify-self-center rounded-lg bg-slate-100 py-4 opacity-80 hover:opacity-100 focus:opacity-100 dark:border-[1.5px] dark:border-solid dark:border-violet-900 dark:bg-slate-800 sm:w-[50%] md:w-[40%] xl:w-[23%] ">
            <div className="flex items-center justify-center ">
              <FaUser className="m-2 rounded-full border-2 border-solid border-slate-900 p-1 text-[5rem] dark:border-slate-200 md:m-4 md:p-2 md:text-[7rem] " />
              {/* <AiOutlineUser className="login__user" /> */}
            </div>
            <form
              className="px-4 tracking-wide placeholder:text-slate-200 dark:placeholder:text-violet-200 lg:px-8 "
              onSubmit={(e) => handleLogin(e)}
            >
              <input
                className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
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
                className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
                placeholder="password"
                id="password"
                type="password"
                required
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="mb-1 block h-10 w-full rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 p-1 font-bold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 dark:border-violet-300 dark:bg-violet-600 dark:text-slate-50 dark:hover:bg-slate-900 lg:mb-4 "
                type="submit"
                value="Login"
                onClick={(e) => handleLogin(e)}
              >
                Login
              </button>
              <p className="mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium text-red-700">
                {error
                  ? error?.response?.data?.message ||
                    error?.data?.message ||
                    error?.response?.data
                  : ""}
              </p>
              <p className="inline text-slate-600 dark:text-violet-200">
                Click to{" "}
              </p>
              <Link
                className="font-semibold text-violet-600 decoration-2 hover:underline dark:text-violet-400  "
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
