import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import { TableHeader } from "../Table";

const InternalResultForm = () => {
  const { paperList } = useContext(UserContext);
  const [paper, setPaper] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [internal, setInternal] = useState([]);
  const [id, setId] = useState([]);
  const [error, setError] = useState("");

  const fetchInternal = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("/internal/" + paper);
      setId(response.data._id);
      setInternal(response.data.marks);
      setDisabled(true);
      setError("");
    } catch (err) {
      setError(err);
      if (err.response.status === 404) {
        const response = await axios.get("paper/" + paper);
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, {
            test: 0,
            seminar: 0,
            assignment: 0,
            attendance: 0,
            total: 0,
          });
        });
        setInternal(students);
        setDisabled(false);
      }
    }
  };

  const addInternalMark = async (e) => {
    e.preventDefault();
    const marks = { id, paper, marks: internal };
    try {
      const response = await axios.post("internal/" + paper, marks);
      toast.success(response.data.message);
      setDisabled(true);
      setError("");
      fetchInternal(e);
    } catch (err) {
      if (err.response.status === 409) {
        try {
          const response = await axios.patch("internal/" + paper, marks);
          toast.success(response.data.message);
          setDisabled(true);
          setError("");
        } catch (err) {
          setError(err);
        }
      } else setError(err);
    }
  };

  const deleteInternalMark = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("internal/" + id);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
      setInternal([]);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    const index = parseInt(e.target.id);
    const value = e.target.value;
    const key = e.target.name;
    const newStudent = internal[index];
    newStudent[key] = value;
    const newInternal = internal.map((student, index) => {
      if (index === e.target.id) {
        return newStudent;
      } else return student;
    });
    setInternal(newInternal);
  };

  return (
    <main className="internal">
      <h2 className="text-violet-950 text-6xl mt-3 mb-2 underline decoration-violet-950 decoration-2 font-bold">
        Internal Mark
      </h2>
      <section className="form__head">
        <form className="flex gap-4 w-full">
          <select
            className="w-1/3 outline-none text-md font-medium leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] inline-block rounded-md p-1  h-10 pl-2 pr-10 border-[1.5px] border-solid border-slate-400 text-slate-900t"
            placeholder="select paper"
            name="paper"
            id="paper"
            value={paper}
            required
            onChange={(e) => setPaper(e.target.value)}
          >
            <option defaultValue hidden>
              Select Paper
            </option>
            {paperList.map((paper) => (
              <option key={paper._id} value={paper._id}>
                {paper.paper}
              </option>
            ))}
          </select>
          <button
            className="bg-slate-800 flex font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-4 px-8 gap-2 items-center w-auto rounded-md"
            type="submit"
            onClick={(e) => fetchInternal(e)}
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
      <section className="internal__body">
        <form className="internal__body__form">
          {internal.length ? (
            <div className="w-full rounded-md border-2 border-slate-900 my-4">
              <table className="w-full">
                <TableHeader
                  Headers={[
                    "Student",
                    "Test",
                    "Seminar",
                    "Assignment",
                    "Attendance",
                    "Total",
                  ]}
                />
                <tbody>
                  {internal?.map((student, index) => (
                    <tr
                      key={index}
                      className={
                        parseInt(student?.test) +
                          parseInt(student?.seminar) +
                          parseInt(student?.assignment) +
                          parseInt(student?.attendance) >
                        7
                          ? "bg-violet-900/50 border-t-[1px] border-slate-400 first:border-none"
                          : "border-t-[1px] border-slate-400 first:border-none"
                      }
                    >
                      <td className="p-2 ">{student.name}</td>
                      <td className="p-2 ">
                        <input
                          className="w-full "
                          type="number"
                          required
                          min="0"
                          max="3"
                          disabled={disabled}
                          id={index}
                          name="test"
                          value={student.test}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-full "
                          type="number"
                          required
                          min="0"
                          max="3"
                          disabled={disabled}
                          id={index}
                          name="seminar"
                          value={student.seminar}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-full "
                          type="number"
                          required
                          min="0"
                          max="3"
                          disabled={disabled}
                          id={index}
                          name="assignment"
                          value={student.assignment}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-full "
                          type="number"
                          required
                          min="0"
                          max="3"
                          disabled={disabled}
                          id={index}
                          name="attendance"
                          value={student.attendance}
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                      <td className="p-2 ">
                        <input
                          className="w-full "
                          type="number"
                          required
                          min="0"
                          max="3"
                          disabled
                          id={index}
                          name="total"
                          value={
                            parseInt(student?.test) +
                            parseInt(student?.seminar) +
                            parseInt(student?.assignment) +
                            parseInt(student?.attendance)
                          }
                          onChange={(e) => handleFormChange(e)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
          {internal.length && disabled ? (
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-slate-800 flex font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-4 px-6 gap-2 items-center w-auto rounded-md"
                onClick={(e) => setDisabled(false)}
              >
                <FaEdit /> Edit
              </button>
              <button
                type="submit"
                className="bg-slate-800 flex font-semibold hover:bg-red-700 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 p-4 gap-2 items-center w-auto rounded-md"
                onClick={(e) => deleteInternalMark(e)}
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
              className="bg-slate-800 flex font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-4 px-6 gap-2 items-center w-auto rounded-md "
              onClick={(e) => addInternalMark(e)}
            >
              <FaPlus /> Save
            </button>
          )}
        </form>
      </section>
    </main>
  );
};

export default InternalResultForm;
