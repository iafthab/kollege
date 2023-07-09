import React, { useContext } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";

const Header = () => {
  const { setUser } = useContext(UserContext);
  const logout = () => {
    setUser("");
    toast.info("Logged Out");
  };
  return (
    <>
      <header className="flex  w-full absolute top-0 justify-between text-slate-900 bg-slate-50">
        <Link
          to="/dash"
          className="text-3xl py-1 px-4 flex items-center font-semibold"
        >
          <FaUniversity className="m-1" />
          <h1
            className="pr-1 m-0 font-spectral hover:bg-gradient-to-r from-slate-900 from-30% to-violet-900 to-70%
          hover:bg-clip-text hover:text-transparent"
          >
            Kollege
          </h1>
        </Link>
        <Link
          to="./"
          className="text-sm font-semibold p-[7px] m-3 rounded-md bg-slate-50   hover:bg-violet-900 hover:text-slate-100  flex items-center"
          onClick={() => logout()}
        >
          <p>Logout&nbsp;&nbsp;</p>
          <FiLogOut className="text-xl" />
        </Link>
      </header>
      <hr className=" border-b-2 border-slate-400 " />
    </>
  );
};

export default Header;
