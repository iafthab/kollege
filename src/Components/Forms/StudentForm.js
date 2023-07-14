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
    <main className="text-slate-500">
      <h2 className="text-violet-950 dark:text-violet-400 underline-offset-4 text-6xl mt-3 dark:mt-0 mb-2 underline decoration-inherit decoration-2 font-bold">
        Student Registration
      </h2>
      <h3 className="font-bold text-lg">TBD</h3>
      <p className="font-bold text-3xl">Student side is under progress</p>
      <form className="w-1/3 mt-8">
        <label htmlFor="name">Name:</label>
        <input
          className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
          type="text"
          required
          id="name"
          value={student.name}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="email">Email:</label>
        <input
          className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
          type="text"
          required
          id="email"
          value={student.email}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="username">Username:</label>
        <input
          className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
          type="text"
          id="username"
          required
          value={student.username}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="password">Password:</label>
        <input
          className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
          type="password"
          id="password"
          value={student.password}
          onChange={(e) => handleFormChange(e)}
          required
        />
        <button
          className="bg-slate-500 font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark text-slate-200 h-10 p-2 border-[1.5px] border-solid block w-full border-violet-900 rounded-md"
          type="submit"
          onClick={(e) => addStudent(e)}
        >
          Add
        </button>
      </form>
      <p className="text-center font-medium text-red-700 whitespace-nowrap overflow-hidden text-ellipsis mb-3">
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
