import axios from "../../config/api/axios";
import { useState, useContext } from "react";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

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
      <h2>Attendance</h2>
      <section className="attendance__head">
        <form>
          <select
            className="form__select"
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
            {paperList.map((paper, index) => (
              <option key={index} value={paper._id}>
                {paper.paper}
              </option>
            ))}
          </select>
          <input
            id="date"
            placeholder="select date"
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
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
          <button type="submit" onClick={(e) => fetchAttendance(e)}>
            Fetch
          </button>
        </form>
      </section>
      <div>
        <p className="form__error">
          {error ? error?.response?.data?.message || error?.response?.data : ""}
        </p>
      </div>
      <section className="attendance__form">
        <form className="internal__body__form">
          <table className="table">
            {attendance?.length ? (
              <thead>
                <tr>
                  <th>present</th>
                  <th>student</th>
                </tr>
              </thead>
            ) : (
              ""
            )}
            <tbody>
              {attendance?.map((student, index) => (
                <tr
                  key={index}
                  className={student.present ? "bg-green" : "bg-red"}
                >
                  <td>
                    <input
                      type="checkbox"
                      required
                      disabled={disabled}
                      id={index}
                      checked={student.present}
                      // value={student.present}
                      onChange={(e) => handleFormChange(e)}
                    />
                  </td>
                  <td>{student.student?.name || student?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {attendance.length && disabled ? (
            <div className="footer">
              <button type="submit" onClick={(e) => setDisabled(false)}>
                <FaEdit /> Edit
              </button>
              <button
                type="submit"
                className="delete_btn"
                onClick={(e) => deleteAttendance(e)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          ) : (
            ""
          )}
          {!disabled && (
            <button type="submit" onClick={(e) => addAttendance(e)}>
              <FaPlus /> Save
            </button>
          )}
        </form>
      </section>
    </main>
  );
};
export default Attendance;
