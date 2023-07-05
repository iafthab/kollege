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
    <main>
      <h2>College Based Data Management System</h2>
      <div className="dash">
        <Link
          to={"./paper"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <GiBookshelf />
          <div>
            Papers
            <p>View Papers and Notes</p>
          </div>
        </Link>

        <Link
          to={"./attendance"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <IoCalendarOutline />
          <div>
            Attendance
            <p>Add or Edit Attendance</p>
          </div>
        </Link>

        <Link
          to={"./internal"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <HiOutlineDocumentReport />
          <div>
            Internal Mark
            <p>View or Edit Internal Marks</p>
          </div>
        </Link>

        <Link
          to={"./time_schedule"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <AiOutlineSchedule />
          <div>
            Time Schedule
            <p>View or Edit Time Schedule</p>
          </div>
        </Link>

        {user.isHOD && (
          <>
            <Link
              to={"./add_paper"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <BiBookAdd />
              <div>
                Add Paper
                <p>Add a New Paper</p>
              </div>
            </Link>

            <Link
              to={"./approve_teacher"}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <RiUserAddLine />
              <div>
                Approve Teacher
                <p>Approve registered teacher(s)</p>
              </div>
            </Link>
          </>
        )}
        <Link
          to={"./reg_student"}
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <AiOutlineUserAdd />
          <div>
            Register Student
            <p>Add a new Student</p>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default Dash;
