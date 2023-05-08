import axios from "../../config/api/axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [paper, setPaper] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [paperList, setPaperList] = useState([]);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  // Fetch papers
  useEffect(() => {
    const getPapersList = async (e) => {
      const list = await axios.get("/paper/teacher/644e4f27cce0a7d6a232420e");
      setPaperList(list.data);
      console.log(list.data);
    };
    getPapersList();
  }, []);

  // fetching Attendance
  const fetchAttendance = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/attendance/${paper}/${date}/${hour}`);
      await setAttendance(response.data.attendance);
      console.log(response.data);
      setDisabled(true);
    } catch (err) {
      if (err.response.status === 404) {
        const response = await axios.get("paper/" + paper);
        const students = response.data.students;
        students.forEach((student) => {
          Object.assign(student, { present: true });
        });
        console.log(students);
        setAttendance(students);
        setDisabled(false);
      } else {
        setError(err);
      }
    }
  };

  const addAttendance = async (e) => {
    e.preventDefault();
    try {
      const newData = attendance.map((i) => {
        return { student: i._id, present: i.present };
      });
      console.log(newData);
      const response = await axios.post(
        `/attendance/${paper}/${date}/${hour}`,
        { paper, date, hour, attendance: newData }
      );
      console.log(response);
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleFormChange = (e) => {
    const index = parseInt(e.target.id);
    // const value = e.target.checked;
    const newStudent = attendance[index];
    newStudent.present = !newStudent.present;
    const newAttendance = attendance.map((student, index) => {
      if (index === parseInt(e.target.id)) return student;
      else return student;
    });
    setAttendance(newAttendance);
    console.log(attendance);
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
            {paperList.map((paper) => (
              <option key={paper._id} value={paper._id}>
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
                <tr key={index}>
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
                  <td>{student.student.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {disabled === false ? (
            <button type="submit" onClick={(e) => addAttendance(e)}>
              Add
            </button>
          ) : (
            ""
          )}
        </form>
      </section>
      <div>
        <p className="form__error">
          {error ? error?.response?.data?.message || error?.response?.data : ""}
        </p>
      </div>
    </main>
  );
};

export default Attendance;
