import { useState } from "react";
import axios from "../../config/api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";
import { toast } from "react-toastify";

const TeacherForm = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    qualification: "",
    department: "",
    roles: [],
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  //TODO Fetch departments and map
  const addTeacher = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(teacher);
      const response = await axios.post("teacher", reqData);
      navigate("../");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="h-screen z-0 relative bg-gradient-to-b from-slate-400 to-slate-300 dark:from-slate-950 dark:to-slate-800 text-slate-900 dark:text-slate-200 flex justify-center items-center">
      <div
        className=" hidden lg:flex flex-row  w-full h-full -z-[1] items-center justify-center blur-2xl gap-32 absolute "
        name="blur design"
      >
        <span className=" w-[8rem] h-[16rem] bg-violet-500 rounded-r-full inline-block   "></span>
        <span className=" w-[16rem] h-[16rem] bg-violet-500 rounded-full inline-block   "></span>
        <span className=" w-[16rem] h-[16rem] bg-violet-500 rounded-full inline-block   "></span>
        <span className=" w-[16rem] h-[16rem] bg-violet-500 rounded-full inline-block   "></span>
        <span className=" w-[8rem] h-[16rem] bg-violet-500 rounded-l-full inline-block   "></span>
      </div>
      <div className="w-1/2 p-8 flex rounded-md justify-start bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-50">
        <section className="flex justify-between flex-col mr-8 ">
          <h2 className="text-5xl font-bold ">
            Teacher
            <br /> Registration
          </h2>
          <Link
            className="font-spectral text-xl text-slate-900 font-semibold  flex items-center dark:text-slate-50"
            to="../"
          >
            <FaUniversity />
            <p
              className="hover:bg-gradient-to-r from-slate-900 from-30% to-violet-900 to-70%
          hover:bg-clip-text hover:text-transparent"
            >
              KOLLEGE
            </p>
          </Link>
        </section>
        <form className="font-medium w-full accent-violet-600">
          <label className="block" htmlFor="name">
            Name:
          </label>
          <input
            className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
            type="text"
            name="name"
            required
            id="name"
            value={teacher.name}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="block" htmlFor="email">
            Email:
          </label>
          <input
            className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
            type="text"
            required
            id="email"
            name="email"
            value={teacher.email}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="block" htmlFor="qualification">
            Qualification:
          </label>
          <input
            className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
            type="text"
            required
            name="qualification"
            id="qualification"
            value={teacher.qualification}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="block" htmlFor="department">
            Department:
          </label>
          <select
            className="w-full outline-none text-md font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
            placeholder="select department"
            name="department"
            id="department"
            value={teacher.department}
            required
            onChange={(e) => handleFormChange(e)}
          >
            <option defaultValue disabled>
              Select Department
            </option>

            <option
              className="font-semibold bg-violet-500 text-slate-100 min-h-[2rem] leading-8"
              value="Computer"
            >
              Computer
            </option>
          </select>
          <label className="block" htmlFor="username">
            Username:
          </label>
          <input
            className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
            name="username"
            type="text"
            required
            id="username"
            value={teacher.username}
            onChange={(e) => handleFormChange(e)}
          />
          <label className="block" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
            type="password"
            name="password"
            id="password"
            value={teacher.password}
            required
            onChange={(e) => handleFormChange(e)}
          />
          <button
            type="submit"
            className="bg-slate-800 font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 p-2 border-[1.5px] border-solid block w-full border-violet-900 rounded-md "
            onClick={(e) => addTeacher(e)}
          >
            Register
          </button>
          <p className="form__error">
            {error
              ? error?.response?.data?.message ||
                error?.data?.message ||
                error?.response?.data
              : ""}
          </p>
        </form>
      </div>
    </main>
  );
};

export default TeacherForm;
