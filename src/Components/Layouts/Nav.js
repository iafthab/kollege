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
    <nav className="h-full py-4 z-0 px-4 bg-slate-950 dark:bg-gradient-to-b dark:from-slate-800 dark:to-slate-950  text-slate-100 ">
      <ul className="flex flex-col gap-[6px] flex-grow items-center justify-center m-auto">
        <NavLink to={"./paper"} className="w-full font-medium">
          <li className="flex py-2 rounded-md px-4 gap-2 hover:bg-violet-600/40 ">
            <GiBookshelf className="text-2xl pt-[0.1rem]  " />
            Papers
          </li>
        </NavLink>
        <NavLink to={"./attendance"} className="w-full font-medium">
          <li className="flex py-2 rounded-md px-4 gap-2 hover:bg-violet-600/40 ">
            <IoCalendarOutline className="text-2xl pt-[0.1rem]  " />
            Attendance
          </li>
        </NavLink>
        <NavLink to={"./internal"} className="w-full font-medium">
          <li className="flex py-2 rounded-md px-4 gap-2 hover:bg-violet-600/40 ">
            <HiOutlineDocumentReport className="text-2xl pt-[0.1rem]  " />
            Internal Mark
          </li>
        </NavLink>
        <NavLink to={"./time_schedule"} className="w-full font-medium">
          <li className="flex py-2 rounded-md px-4 gap-2 hover:bg-violet-600/40 ">
            <AiOutlineSchedule className="text-2xl pt-[0.1rem]  " />
            Time Schedule
          </li>
        </NavLink>
        {user.isHOD && (
          <>
            <NavLink to={"./add_paper"} className="w-full font-medium">
              <li className="flex py-2 rounded-md px-4 gap-2 hover:bg-violet-600/40 ">
                <BiBookAdd className="text-2xl pt-[0.1rem]  " />
                Add Paper
              </li>
            </NavLink>
            <NavLink to={"./approve_teacher"} className="w-full font-medium">
              <li className="flex py-2 rounded-md px-4 gap-2 hover:bg-violet-600/40 ">
                <RiUserAddLine className="text-2xl pt-[0.1rem]  " />
                Approve Teacher
              </li>
            </NavLink>
          </>
        )}
        <NavLink to={"./reg_student"} className="w-full font-medium">
          <li className="flex py-2 rounded-md px-4 gap-2 hover:bg-violet-600/40 ">
            <AiOutlineUserAdd className="text-2xl pt-[0.1rem]  " />
            Register Student
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
