import { useState, useEffect } from "react";
import axios from "../../config/api/axios";

const TimeScheduleForm = () => {
  const [timeSchedule, setTimeSchedule] = useState({});
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);

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
    const getTimeSchedule = async (e) => {
      try {
        const response = await axios.get(
          "time_schedule/644e4f27cce0a7d6a232420e"
        );
        //? Needs checking
        delete response.data.schedule._id;
        setTimeSchedule(response.data.schedule);
      } catch (err) {
        if (err.response.status === 404) {
          setTimeSchedule({
            monday: ["--", "--", "--", "--", "--"],
            tuesday: ["--", "--", "--", "--", "--"],
            wednesday: ["--", "--", "--", "--", "--"],
            thursday: ["--", "--", "--", "--", "--"],
            friday: ["--", "--", "--", "--", "--"],
          });
          setDisabled(false);
        } else setError(err);
      }
    };
    getTimeSchedule();

    const getPapersList = async (e) => {
      const list = await axios.get("/paper/teacher/644e4f27cce0a7d6a232420e");
      setPapers(list.data);
    };
    getPapersList();
  }, []);
  console.log(timeSchedule);

  const addTimeSchedule = async (e) => {
    e.preventDefault();
    try {
      const data = {
        teacher: "644e4f27cce0a7d6a232420e",
        schedule: timeSchedule,
      };
      const reqData = JSON.stringify(data);
      const response = await axios.post(
        "time_schedule/644e4f27cce0a7d6a232420e",
        reqData
      );
      console.log(response);
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
            {Object.entries(timeSchedule)?.map(([key, value]) => {
              return (
                <tr key={key} className="table__row">
                  <th>{key}</th>
                  {value.map((day, index) => (
                    <td id="table__td" key={index}>
                      <select
                        className="table__input"
                        value={day}
                        name={key}
                        id={index}
                        disabled={disabled}
                        onChange={(e) => handleFormChange(e)}
                      >
                        <option defaultValue>--</option>
                        {papers?.map((paper) => (
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
        {disabled === false && (
          <button type="submit" onClick={(e) => addTimeSchedule(e)}>
            Add
          </button>
        )}
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

export default TimeScheduleForm;
