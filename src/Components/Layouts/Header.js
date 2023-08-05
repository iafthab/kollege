import React, { useContext } from "react";
import { FaUniversity } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";

const Header = () => {
  const { setUser, setUserType } = useContext(UserContext);
  const logout = () => {
    setUser("");
    setUserType("");
    toast.info("Logged Out");
  };
  return (
    <header className="absolute top-0 flex w-full justify-between bg-slate-950 text-slate-50 dark:bg-slate-800 ">
      <Link
        to="/dash"
        className="ml-4 flex items-center gap-2 px-3 py-1 text-3xl font-semibold"
      >
        <FaUniversity className="m-1" />
        <h1 className="m-0 pr-1 font-spectral text-slate-50 decoration-violet-500 decoration-[3px] underline-offset-[3px] hover:underline">
          K
          <span className="inline-block h-[1.15rem] w-[1.15rem] rounded-full bg-violet-500 dark:bg-violet-400"></span>
          llege
        </h1>
      </Link>
      <Link
        to="./"
        className="text-md m-2 mr-4 flex items-center rounded-md p-[7px] font-semibold  hover:bg-red-700 hover:text-slate-100"
        onClick={() => logout()}
      >
        <p>&nbsp;Logout&nbsp;&nbsp;</p>
        <FiLogOut className="text-xl" />
      </Link>
    </header>
  );
};

export default Header;
