import { NavLink } from "react-router-dom";
import { BsConeStriped } from "react-icons/bs";

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <NavLink
          to={"./papers"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>Papers</li>
        </NavLink>
        <NavLink
          to={"./attendance"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            Attendance <BsConeStriped />{" "}
          </li>
        </NavLink>
        <NavLink
          to={"./internal"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            Internal Mark <BsConeStriped />
          </li>
        </NavLink>
        <NavLink
          to={"./time_schedule"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>Time Schedule</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
