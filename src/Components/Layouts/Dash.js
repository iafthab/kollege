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
      <h2 className="m-6 mx-auto text-center text-6xl font-bold dark:text-slate-400">
        Dashboard
      </h2>
      <div className="grid grid-cols-1 place-content-center gap-3 px-1 py-4 lg:grid-cols-2 lg:gap-4 lg:px-8 xl:grid-cols-3">
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-slate-950 dark:hover:bg-violet-700/50 lg:text-lg"
          to={"./paper"}
        >
          <GiBookshelf className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Papers
            <p className="text-sm font-normal lg:text-base ">
              View Papers and Notes
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-slate-950 dark:hover:bg-violet-700/50 lg:text-lg"
          to={"./attendance"}
        >
          <IoCalendarOutline className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Attendance
            <p className="text-sm font-normal lg:text-base ">
              Add or Edit Attendance
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-slate-950 dark:hover:bg-violet-700/50 lg:text-lg"
          to={"./internal"}
        >
          <HiOutlineDocumentReport className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Internal Mark
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Internal Marks
            </p>
          </div>
        </Link>

        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-slate-950 dark:hover:bg-violet-700/50 lg:text-lg"
          to={"./time_schedule"}
        >
          <AiOutlineSchedule className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Time Schedule
            <p className="text-sm font-normal lg:text-base ">
              View or Edit Time Schedule
            </p>
          </div>
        </Link>

        {user.isHOD && (
          <>
            <Link
              className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-slate-950 dark:hover:bg-violet-700/50 lg:text-lg"
              to={"./add_paper"}
            >
              <BiBookAdd className="text-[2.5rem] lg:text-[4rem] " />
              <div className="font-semibold">
                Add Paper
                <p className="text-sm font-normal lg:text-base ">
                  Add a New Paper
                </p>
              </div>
            </Link>

            <Link
              className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-slate-950 dark:hover:bg-violet-700/50 lg:text-lg"
              to={"./approve_teacher"}
            >
              <RiUserAddLine className="text-[2.5rem] lg:text-[4rem] " />
              <div className="font-semibold">
                Approve Teacher
                <p className="text-sm font-normal lg:text-base ">
                  Approve registered teacher(s)
                </p>
              </div>
            </Link>
          </>
        )}
        <Link
          className="flex gap-2 rounded-lg bg-violet-100 p-6 text-base hover:bg-violet-950 hover:text-slate-100 dark:bg-slate-950 dark:hover:bg-violet-700/50 lg:text-lg"
          to={"./reg_student"}
        >
          <AiOutlineUserAdd className="text-[2.5rem] lg:text-[4rem] " />
          <div className="font-semibold">
            Register Student
            <p className="text-sm font-normal lg:text-base ">
              Add a new Student
            </p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dash;
