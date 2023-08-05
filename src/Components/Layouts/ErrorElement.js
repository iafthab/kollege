import React, { useContext } from "react";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import UserContext from "../../Hooks/UserContext";

const ErrorElement = () => {
  const { user } = useContext(UserContext);
  const error = useRouteError();

  return (
    <div className="body">
      {user && <Header />}
      <main className="mt-[3.15rem] flex h-[calc(100vh-3.15rem)] whitespace-nowrap bg-slate-950 dark:bg-slate-800">
        {user && <Nav />}
        <div className="outlet-border z-[1] mt-1 w-full overflow-y-auto whitespace-break-spaces bg-slate-50 p-4 text-slate-900 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-950 dark:text-slate-400 ">
          <h2 className="text-6xl font-bold text-violet-950 dark:text-slate-400">
            Oops!
          </h2>
          <p>Sorry, an unexpected error has occurred.</p>
          <p>
            <i>{error.statusText || error.message}</i>
          </p>
        </div>
      </main>
    </div>
  );
};

export default ErrorElement;
