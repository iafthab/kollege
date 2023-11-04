import { useContext } from "react";
import { useRouteError } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import UserContext from "../../Hooks/UserContext";

const ErrorElement = () => {
  const { user } = useContext(UserContext);
  const error = useRouteError();

  return (
    <div className="relative flex flex-col bg-slate-950">
      {user && <Header />}
      <main className="mt-[3.15rem] flex h-[calc(100vh-3.15rem)] whitespace-nowrap bg-slate-950 dark:bg-gradient-to-b dark:from-slate-950 dark:to-violet-950/60">
        {user && <Nav />}
        <div className="outlet-border z-[1] mt-1 w-full overflow-y-auto bg-slate-50 p-4 text-slate-900 dark:bg-gradient-to-t dark:from-slate-950 dark:from-75% dark:to-[#200c45] dark:text-slate-400 lg:p-10">
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
