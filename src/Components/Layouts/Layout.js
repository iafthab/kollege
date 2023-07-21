import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";

const Layout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;

  return (
    <div className="relative flex flex-col bg-slate-950">
      <Header />
      <main className="mt-[3.15rem] flex h-[calc(100vh-3.15rem)] whitespace-nowrap bg-slate-950 dark:bg-slate-800">
        {location === "/dash" ? "" : <Nav />}
        {user ? (
          <div className="outlet-border z-[1] mt-1 w-full overflow-y-auto bg-slate-50 px-4 py-4 text-slate-900 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-950 dark:text-slate-300">
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
