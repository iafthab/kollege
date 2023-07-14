import React, { useContext, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import { Link } from "react-router-dom";
import { GiBookshelf } from "react-icons/gi";
import { IoCalendarOutline } from "react-icons/io5";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { AiOutlineSchedule } from "react-icons/ai";
import { BiBookAdd } from "react-icons/bi";
import { RiUserAddLine } from "react-icons/ri";
import { AiOutlineUserAdd } from "react-icons/ai";

const Dash = () => {
  const { setPaperList, user } = useContext(UserContext);

  useEffect(() => {
    const getPapers = async () => {
      const response = await axios.get("paper/teacher/" + user._id);
      setPaperList(response.data);
    };
    getPapers();
  }, [user, setPaperList]);

  return (
    <main className="self-center">
      <h2 className="m-6 text-6xl font-bold text-center">Dashboard</h2>
      <div className="py-4 px-8 grid place-content-center grid-cols-3 gap-2">
        <Link
          className="p-6 text-lg hover:bg-violet-950 hover:text-slate-100 dark:hover:bg-violet-700/50 rounded-lg flex gap-2"
          to={"./paper"}
        >
          <GiBookshelf className="text-[4rem]" />
          <div className="font-semibold">
            Papers
            <p className="font-normal text-md ">View Papers and Notes</p>
          </div>
        </Link>

        <Link
          className="p-6 text-lg hover:bg-violet-950 hover:text-slate-100 dark:hover:bg-violet-700/50 rounded-lg flex gap-2"
          to={"./attendance"}
        >
          <IoCalendarOutline className="text-[4rem]" />
          <div className="font-semibold">
            Attendance
            <p className="font-normal text-md ">Add or Edit Attendance</p>
          </div>
        </Link>

        <Link
          className="p-6 text-lg hover:bg-violet-950 hover:text-slate-100 dark:hover:bg-violet-700/50 rounded-lg flex gap-2"
          to={"./internal"}
        >
          <HiOutlineDocumentReport className="text-[4rem]" />
          <div className="font-semibold">
            Internal Mark
            <p className="font-normal text-md ">View or Edit Internal Marks</p>
          </div>
        </Link>

        <Link
          className="p-6 text-lg hover:bg-violet-950 hover:text-slate-100 dark:hover:bg-violet-700/50 rounded-lg flex gap-2"
          to={"./time_schedule"}
        >
          <AiOutlineSchedule className="text-[4rem]" />
          <div className="font-semibold">
            Time Schedule
            <p className="font-normal text-md ">View or Edit Time Schedule</p>
          </div>
        </Link>

        {user.isHOD && (
          <>
            <Link
              className="p-6 text-lg hover:bg-violet-950 hover:text-slate-100 dark:hover:bg-violet-700/50 rounded-lg flex gap-2"
              to={"./add_paper"}
            >
              <BiBookAdd className="text-[4rem]" />
              <div className="font-semibold">
                Add Paper
                <p className="font-normal text-md ">Add a New Paper</p>
              </div>
            </Link>

            <Link
              className="p-6 text-lg hover:bg-violet-950 hover:text-slate-100 dark:hover:bg-violet-700/50 rounded-lg flex gap-2"
              to={"./approve_teacher"}
            >
              <RiUserAddLine className="text-[4rem]" />
              <div className="font-semibold">
                Approve Teacher
                <p className="font-normal text-md ">
                  Approve registered teacher(s)
                </p>
              </div>
            </Link>
          </>
        )}
        <Link
          className="p-6 text-lg hover:bg-violet-950 hover:text-slate-100 dark:hover:bg-violet-700/50 rounded-lg flex gap-2"
          to={"./reg_student"}
        >
          <AiOutlineUserAdd className="text-[4rem]" />
          <div className="font-semibold">
            Register Student
            <p className="font-normal text-md ">Add a new Student</p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dash;
