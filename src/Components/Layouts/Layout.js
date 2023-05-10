import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";
import { useContext } from "react";
import UserContext from "../../Hooks/UserContext";

const Layout = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user._id ? (
        <div className="body">
          <Header />
          <main className="main">
            <Nav />
            <div className="outlet">
              <Outlet />
            </div>
          </main>
        </div>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default Layout;
