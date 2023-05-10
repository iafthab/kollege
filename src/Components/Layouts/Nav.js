import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav">
      <ul>
        <NavLink
          to={"./paper"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>Papers</li>
        </NavLink>
        <NavLink
          to={"./attendance"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>Attendance</li>
        </NavLink>
        <NavLink
          to={"./internal"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>Internal Mark</li>
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
