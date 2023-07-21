import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    papers: [],
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(student);
      const response = await axios.post("student", reqData);
      console.log(response);
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
    }
    console.log(error);
  };

  return (
    <main className="whitespace-pre-wrap text-slate-500">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Student Registration
      </h2>
      <h3 className="text-lg font-bold">TBD</h3>
      <p className="text-3xl font-bold">Student side is under progress</p>
      <form className="mt-8 w-full lg:w-1/3">
        <label htmlFor="name">Name:</label>
        <input
          className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
          type="text"
          required
          id="name"
          value={student.name}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="email">Email:</label>
        <input
          className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
          type="text"
          required
          id="email"
          value={student.email}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="username">Username:</label>
        <input
          className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
          type="text"
          id="username"
          required
          value={student.username}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="password">Password:</label>
        <input
          className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
          type="password"
          id="password"
          value={student.password}
          onChange={(e) => handleFormChange(e)}
          required
        />
        <button
          className="dark mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-500 p-2 font-semibold text-slate-200 hover:bg-violet-900 focus:bg-violet-900"
          type="submit"
          onClick={(e) => addStudent(e)}
        >
          Add
        </button>
      </form>
      <p className="mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium text-red-700">
        {error
          ? error?.response?.data?.message ||
            error?.data?.message ||
            error?.response?.data
          : ""}
      </p>
    </main>
  );
};

export default StudentForm;
