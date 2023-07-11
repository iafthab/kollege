import { Outlet, Navigate, useLocation } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";

const Layout = () => {
  const { user } = useContext(UserContext);
  const location = useLocation().pathname;

  return (
    <div className="flex flex-col relative">
      <Header />
      <main className="flex h-[calc(100vh-3.35rem)] whitespace-nowrap bg-slate-950 mt-[3.35rem]">
        {location === "/dash" ? "" : <Nav />}
        {user ? (
          <div className=" py-4 px-8 border-slate-950 rounded-xl border-4  bg-slate-50  w-full overflow-y-auto">
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
