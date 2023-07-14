import axios from "../../config/api/axios";
import { useState, useContext } from "react";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader, RowWithCheckbox } from "../Table";

const Attendance = () => {
  const { paperList } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const [paper, setPaper] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");

  // fetching Attendance
  const fetchAttendance = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.get(`/attendance/${paper}/${date}/${hour}`);
      setId(response.data._id);
      setAttendance(response.data.attendance);
      setDisabled(true);
    } catch (err) {
      setError(err);
      if (err.response.status === 404) {
        const response = await axios.get("paper/" + paper);
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, { present: true });
        });
        setAttendance(students);
        setDisabled(false);
      }
    }
  };

  const addAttendance = async (e) => {
    e.preventDefault();
    const newData = attendance.map((i) => {
      return { student: i._id, present: i.present };
    });
    try {
      const response = await axios.post(
        `/attendance/${paper}/${date}/${hour}`,
        { paper, date, hour, attendance: newData }
      );
      toast.success(response.data.message);
      setDisabled(true);
      setError("");
      fetchAttendance(e);
    } catch (err) {
      if (err?.response.status === 409) {
        const newData = attendance.map((i) => {
          return { student: i.student._id, present: i.present };
        });
        try {
          const response = await axios.patch(
            `/attendance/${paper}/${date}/${hour}`,
            { id, paper, date, hour, attendance: newData }
          );
          toast.success(response.data.message);
          setDisabled(true);
          setError("");
          fetchAttendance(e);
        } catch (err) {
          setError(err);
        }
      } else setError(err);
    }
  };

  const deleteAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("attendance/" + id);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setAttendance([]);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    const index = parseInt(e.target.id);
    const newStudent = attendance[index];
    newStudent.present = !newStudent.present;
    const newAttendance = attendance.map((student, index) => {
      if (index === parseInt(e.target.id)) return student;
      else return student;
    });
    setAttendance(newAttendance);
  };

  return (
    <main className="attendance">
      <h2 className="text-violet-950 dark:text-slate-400 underline-offset-4 text-6xl mt-3 dark:mt-0 mb-2 underline decoration-inherit decoration-2 font-bold">
        Attendance
      </h2>
      <section className="attendance__head">
        <form className="flex gap-4 w-full accent-violet-900 ">
          <select
            className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit "
            placeholder="Select Paper"
            name="paper"
            id="paper"
            value={paper}
            required
            onChange={(e) => setPaper(e.target.value)}
          >
            <option defaultValue hidden>
              Select Paper
            </option>
            {paperList.map((paper, index) => (
              <option key={index} value={paper._id}>
                {paper.paper}
              </option>
            ))}
          </select>
          <input
            className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
            id="date"
            placeholder="Select Date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
            name="hour"
            id="hour"
            value={hour}
            required
            onChange={(e) => setHour(e.target.value)}
          >
            <option defaultValue hidden>
              Select Hour
            </option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
            <option value="5">V</option>
          </select>
          <button
            className="tracking-wide dark:border-violet-300 dark:hover:bg-slate-900 bg-slate-800 font-semibold dark:bg-violet-900 dark:text-violet-100 hover:bg-violet-900 mb-4 focus:bg-violet-900 text-slate-200 h-10 py-2 px-8 border-[1.5px] border-solid w-auto border-violet-900 rounded-md"
            type="submit"
            onClick={(e) => fetchAttendance(e)}
          >
            Fetch
          </button>
        </form>
      </section>
      <div>
        <p className="text-center font-medium text-red-700 whitespace-nowrap overflow-hidden text-ellipsis mb-3">
          {error ? error?.response?.data?.message || error?.response?.data : ""}
        </p>
      </div>
      <section className="attendance__form">
        <form className="w-full">
          {attendance?.length ? (
            <div className="rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px] my-4 w-1/2">
              <table className="w-full">
                <TableHeader Headers={["Present", "Student"]} />
                <tbody>
                  {attendance?.map((student, index) => (
                    <RowWithCheckbox
                      key={index}
                      keys={index}
                      disabled={disabled}
                      value={student}
                      handleFormChange={handleFormChange}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          {attendance.length && disabled ? (
            <div className="flex gap-4">
              <button
                type="submit"
                className="tracking-wide dark:border-violet-300 dark:hover:bg-slate-900 bg-slate-800 font-semibold dark:bg-violet-900 dark:text-violet-100 hover:bg-violet-900 mb-4 focus:bg-violet-900 text-slate-200 h-10 py-2 px-6 border-[1.5px] border-solid flex items-center gap-2 w-auto border-violet-900 rounded-md"
                onClick={(e) => setDisabled(false)}
              >
                <FaEdit /> Edit
              </button>
              <button
                type="submit"
                className="tracking-wide dark:border-violet-300 dark:hover:bg-red-700 bg-slate-800 font-semibold dark:bg-violet-900 dark:text-violet-100 hover:bg-red-700 mb-4 focus:bg-violet-900 text-slate-200 h-10 py-2 px-4 border-[1.5px] border-solid flex items-center gap-2 w-auto border-violet-900 rounded-md"
                onClick={(e) => deleteAttendance(e)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ) : (
            ""
          )}
          {!disabled && (
            <button
              type="submit"
              className="tracking-wide dark:border-violet-300 dark:hover:bg-slate-900 bg-slate-800 font-semibold dark:bg-violet-900 dark:text-violet-100 hover:bg-violet-900 mb-4 focus:bg-violet-900 text-slate-200 h-10 py-2 px-4 border-[1.5px] border-solid flex items-center gap-2 w-auto border-violet-900 rounded-md "
              onClick={(e) => addAttendance(e)}
            >
              <FaPlus /> Save
            </button>
          )}
        </form>
      </section>
    </main>
  );
};
export default Attendance;
