import { useState, useEffect } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const TimeScheduleForm = () => {
  const [timeSchedule, setTimeSchedule] = useState({
    monday: ["--", "--", "--", "--", "--"],
    tuesday: ["--", "--", "--", "--", "--"],
    wednesday: ["--", "--", "--", "--", "--"],
    thursday: ["--", "--", "--", "--", "--"],
    friday: ["--", "--", "--", "--", "--"],
  });
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const index = parseInt(e.target.id);
    const day = e.target.name;
    const value = e.target.value;
    const newDay = timeSchedule[day].map((val, ind) => {
      if (ind === index) {
        return value;
      } else return val;
    });
    setTimeSchedule({
      ...timeSchedule,
      [e.target.name]: newDay,
    });
  };

  // Fetch papers
  useEffect(() => {
    const getPapersList = async (e) => {
      const list = await axios.get("/paper/teacher/644e4f59cce0a7d6a2324211");
      setPapers(list.data);
    };
    getPapersList();
  }, []);

  const addTimeSchedule = async (e) => {
    e.preventDefault();
    try {
      const data = {
        teacher: "644e4f59cce0a7d6a2324211",
        schedule: timeSchedule,
      };
      const reqData = JSON.stringify(data);
      const response = await axios.post(
        "time_schedule/644e4f59cce0a7d6a2324211",
        reqData
      );
      console.log(response);
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="time_schedule">
      <h2>Add Time Schedule</h2>
      <form>
        <table className="table">
          <thead>
            <tr>
              <th>Day/Hour</th>
              <th>I</th>
              <th>II</th>
              <th>III</th>
              <th>IV</th>
              <th>V</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(timeSchedule).map(([key, value]) => {
              return (
                <tr key={key} className="table__row">
                  <th>{key}</th>
                  {value?.map((day, index) => (
                    <td id="table__td" key={index}>
                      <select
                        className="table__input"
                        value={day}
                        name={key}
                        id={index}
                        onChange={(e) => handleFormChange(e)}
                      >
                        <option defaultValue>--</option>
                        {papers.map((paper) => (
                          <option key={paper._id} value={paper.name}>
                            {paper.paper}
                          </option>
                        ))}
                      </select>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button type="submit" onClick={(e) => addTimeSchedule(e)}>
          Add
        </button>
      </form>
      <p className="form__error">
        {error
          ? error?.response?.data?.message ||
            error?.data?.message ||
            error?.response?.data
          : ""}
      </p>
    </main>
  );
};

export { TimeScheduleForm };
