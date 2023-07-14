import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";

const PaperForm = () => {
  const { user } = useContext(UserContext);
  const [paper, setPaper] = useState({
    department: user.department,
    paper: "",
    year: "2023",
    students: [],
    semester: "Select Semester",
    teacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch teachers
  useEffect(() => {
    const getTeachers = async (e) => {
      const list = await axios.get("/teacher/list");
      setTeachers(list.data);
    };
    getTeachers();
  }, []);

  const addPaper = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("paper", JSON.stringify(paper));
      navigate("./../");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    setPaper({
      ...paper,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.isHOD ? (
        <main className="paper">
          <h2 className="text-violet-950 text-6xl mt-3 mb-2 underline decoration-violet-950 decoration-2 font-bold">
            Add Paper
          </h2>
          <form className="w-1/3">
            <label htmlFor="department">Department:</label>
            <input
              className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900 "
              name="department"
              type="text"
              required
              id="department"
              value={paper.department}
              disabled
            />
            <label htmlFor="paper">Paper:</label>
            <input
              className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900 "
              type="text"
              name="paper"
              id="paper"
              value={paper.paper}
              required
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="semester">Semester:</label>
            <select
              className="w-full outline-none text-md font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900 "
              id="semester"
              value={paper.semester}
              required
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Semester
              </option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
            </select>
            <label htmlFor="year">Year:</label>
            <input
              className="w-full outline-none text-sm font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900 "
              type="number"
              min="2000"
              max="2030"
              step="1"
              required
              id="year"
              value={paper.year}
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="teacher">Teacher:</label>
            <select
              className="w-full outline-none text-md font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-1  h-10 pl-2 border-[1.5px] border-solid border-slate-400 text-slate-900 "
              required
              id="teacher"
              name="teacher"
              value={paper.teacher}
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Teacher
              </option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <button
              className="bg-slate-800 font-semibold flex items-center gap-2 hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-2 px-8 border-[1.5px] border-solid w-auto border-violet-900 rounded-md"
              type="submit"
              onClick={(e) => addPaper(e)}
            >
              <FaPlus />
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
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default PaperForm;
