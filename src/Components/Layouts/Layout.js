import { Outlet } from "react-router-dom";
import Header from "./Header";
import Nav from "./Nav";

const Layout = () => {
  return (
    <div className="body">
      <Header />
      <main className="main">
        <Nav />
        <div className="outlet">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
