import React from "react";
import { FaUser, FaUniversity } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className="header">
      <NavLink to="../" className="header__profile">
        <h1 className="header__h1">Kollege</h1>
        <FaUniversity />
      </NavLink>
      <NavLink to={"./profile"} className="header__profile">
        <p>Profile&nbsp;</p>
        <FaUser />
      </NavLink>
    </header>
  );
};

export default Header;
