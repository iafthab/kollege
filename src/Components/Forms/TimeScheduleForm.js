import { useState, useContext, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const TimeScheduleForm = () => {
  const { user, paperList } = useContext(UserContext);
  const [timeSchedule, setTimeSchedule] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");
  const [error, setError] = useState("");

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

  useEffect(() => {
    const fetchTimeSchedule = async () => {
      try {
        const response = await axios.get("time_schedule/" + user._id);
        setId(response.data._id);
        delete response.data.schedule._id;
        setTimeSchedule(response.data.schedule);
      } catch (err) {
        if (err.response.status === 404) {
          setDisabled(false);
          setTimeSchedule({
            monday: ["--", "--", "--", "--", "--"],
            tuesday: ["--", "--", "--", "--", "--"],
            wednesday: ["--", "--", "--", "--", "--"],
            thursday: ["--", "--", "--", "--", "--"],
            friday: ["--", "--", "--", "--", "--"],
          });
        } else setError(err);
      }
    };
    fetchTimeSchedule();
  }, [user]);

  const addTimeSchedule = async (e) => {
    e.preventDefault();
    const data = {
      teacher: user._id,
      schedule: timeSchedule,
    };
    try {
      const response = await axios.post("time_schedule/" + user._id, data);
      alert(response.data.message);
    } catch (err) {
      if (err.response.status === 409) {
        const response = await axios.patch("time_schedule/" + user._id, data);
        alert(response.data.message);
      } else setError(err);
    } finally {
      setDisabled(true);
    }
  };

  const deleteTimeSchedule = async (e) => {
    e.preventDefault();
    const response = await axios.delete("time_schedule/" + id);
    alert(response.data.message);
    setTimeSchedule({});
  };

  return (
    <main className="time_schedule">
      <h2>Time Schedule</h2>
      <form>
        {timeSchedule && (
          <table className="table">
            <thead>
              <tr>
                <th>Day/Hour</th>
                <th>I</th>
                <th>II</th>
                <th>III</th>
                {/* <th className="time_schedule__break" rowSpan="5">
                  B R E A K
                </th> */}
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
                          {paperList?.map((paper) => (
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
        )}

        {timeSchedule && disabled && (
          <div className="footer">
            <button type="submit" onClick={() => setDisabled(false)}>
              <FaEdit /> Edit
            </button>
            <button
              type="submit"
              className="delete_btn"
              onClick={(e) => deleteTimeSchedule(e)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
        {!disabled && (
          <button type="submit" onClick={(e) => addTimeSchedule(e)}>
            <FaPlus /> Save
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
