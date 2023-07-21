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
    <nav className="z-0 hidden h-full bg-slate-950 px-4 py-4 text-slate-100 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-950  lg:block ">
      <ul className="m-auto flex flex-grow flex-col items-center justify-center gap-[6px]">
        <NavLink to={"./paper"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <GiBookshelf className="pt-[0.1rem] text-2xl  " />
            Papers
          </li>
        </NavLink>
        <NavLink to={"./attendance"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <IoCalendarOutline className="pt-[0.1rem] text-2xl  " />
            Attendance
          </li>
        </NavLink>
        <NavLink to={"./internal"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <HiOutlineDocumentReport className="pt-[0.1rem] text-2xl  " />
            Internal Mark
          </li>
        </NavLink>
        <NavLink to={"./time_schedule"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <AiOutlineSchedule className="pt-[0.1rem] text-2xl  " />
            Time Schedule
          </li>
        </NavLink>
        {user.isHOD && (
          <>
            <NavLink to={"./add_paper"} className="w-full font-medium">
              <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
                <BiBookAdd className="pt-[0.1rem] text-2xl  " />
                Add Paper
              </li>
            </NavLink>
            <NavLink to={"./approve_teacher"} className="w-full font-medium">
              <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
                <RiUserAddLine className="pt-[0.1rem] text-2xl  " />
                Approve Teacher
              </li>
            </NavLink>
          </>
        )}
        <NavLink to={"./reg_student"} className="w-full font-medium">
          <li className="flex gap-2 rounded-md px-4 py-2 hover:bg-violet-600/40 ">
            <AiOutlineUserAdd className="pt-[0.1rem] text-2xl  " />
            Register Student
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
