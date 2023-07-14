import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";

const Layout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;

  return (
    <div className="flex flex-col relative bg-slate-950">
      <Header />
      <main className="flex h-[calc(100vh-3.15rem)] whitespace-nowrap dark:bg-slate-800 bg-slate-950 mt-[3.15rem]">
        {location === "/dash" ? "" : <Nav />}
        {user ? (
          <div className="mt-1  z-[1] py-4 px-8 dark:py-0 dark:text-slate-300 outlet-border text-slate-900 rounded-xl border-4 bg-slate-50 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-950  w-full overflow-y-auto">
            <Outlet />
          </div>
        ) : (
          // <p>Login to continue</p>
          <Navigate to="/" replace={true} />
        )}
      </main>
    </div>
  );
};

export default Layout;
