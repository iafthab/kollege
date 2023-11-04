import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";

// layout of the entire dash/ route
const Layout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;

  return (
    <div className="relative flex flex-col bg-slate-950">
      <Header />
      <main className="mt-[3.15rem] flex h-[calc(100vh-3.15rem)] whitespace-nowrap bg-slate-950 dark:bg-gradient-to-b dark:from-slate-950 dark:to-violet-950/60 ">
        {location === "/dash" ? "" : <Nav />}
        {user ? (
          <div className="outlet-border z-[1] mt-1 w-full overflow-y-auto bg-slate-50 p-4 text-slate-900 dark:bg-gradient-to-t dark:from-slate-950 dark:from-75% dark:to-[#200c45] dark:text-slate-400 lg:p-10">
            <Outlet />
          </div>
        ) : (
          <Navigate to="/" replace={true} />
        )}
      </main>
    </div>
  );
};

export default Layout;
