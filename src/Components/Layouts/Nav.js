import { useContext } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";

const Nav = () => {
  const { user } = useContext(UserContext);
  return (
    <nav className="nav">
      <ul>
        <NavLink
          to={"./paper"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <GiBookshelf />
            Papers
          </li>
        </NavLink>
        <NavLink
          to={"./attendance"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <IoCalendarOutline />
            Attendance
          </li>
        </NavLink>
        <NavLink
          to={"./internal"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <HiOutlineDocumentReport />
            Internal Mark
          </li>
        </NavLink>
        <NavLink
          to={"./time_schedule"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <AiOutlineSchedule />
            Time Schedule
          </li>
        </NavLink>
        {user.isHOD && (
          <>
            <NavLink
              to={"./add_paper"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>
                <BiBookAdd />
                Add Paper
              </li>
            </NavLink>
            <NavLink
              to={"./approve_teacher"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <li>
                <RiUserAddLine />
                Approve Teacher
              </li>
            </NavLink>
          </>
        )}
        <NavLink
          to={"./reg_student"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <li>
            <AiOutlineUserAdd />
            Register Student
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
