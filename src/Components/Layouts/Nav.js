import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";

const Nav = () => {
  const { user } = useContext(UserContext);
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
        {user.isHOD && (
          <>
            <NavLink
              to={"./add_paper"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>Add Paper</li>
            </NavLink>
            <NavLink
              to={"./approve_teacher"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>Approve Teacher</li>
            </NavLink>
          </>
        )}
        <NavLink
          to={"./reg_student"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>Register Student</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
