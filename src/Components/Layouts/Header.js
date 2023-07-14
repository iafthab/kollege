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
    <header className="flex w-full absolute top-0 justify-between text-slate-50 dark:bg-slate-800 bg-slate-950 ">
      <Link
        to="/dash"
        className="text-3xl py-1 px-3 ml-4 flex gap-2 items-center font-semibold"
      >
        <FaUniversity className="m-1" />
        <h1 className="pr-1 m-0 font-spectral hover:underline decoration-[3px] decoration-violet-500 underline-offset-[3px] text-slate-50">
          K
          <span className="bg-violet-500 dark:bg-violet-400 h-[1.15rem] w-[1.15rem] rounded-full inline-block"></span>
          llege
        </h1>
      </Link>
      <Link
        to="./"
        className="text-md font-semibold p-[7px] m-2 mr-4 rounded-md hover:bg-red-700 hover:text-slate-100  flex items-center"
        onClick={() => logout()}
      >
        <p>&nbsp;Logout&nbsp;&nbsp;</p>
        <FiLogOut className="text-xl" />
      </Link>
    </header>
  );
};

export default Header;
