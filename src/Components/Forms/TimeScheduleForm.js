import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

const TimeScheduleForm = () => {
  const { user } = useContext(UserContext);
  const [timeSchedule, setTimeSchedule] = useState({});
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [id, setId] = useState("");

  const handleFormChange = (e) => {
    console.log(id);
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
        const response = await axios.get("time_schedule/" + user._id);
        //? Needs checking
        setId(response.data._id);
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
      const list = await axios.get("/paper/teacher/" + user._id);
      setPapers(list.data);
    };
    getPapersList();
  }, [user]);

  const addTimeSchedule = async (e) => {
    e.preventDefault();
    const data = {
      teacher: user._id,
      schedule: timeSchedule,
    };
    const reqData = JSON.stringify(data);
    try {
      const response = await axios.post("time_schedule/" + user._id, reqData);
      alert(response.data.message);
    } catch (err) {
      if (err.response.status === 409) {
        try {
          const response = await axios.patch(
            "time_schedule/" + user._id,
            reqData
          );
          alert(response.data.message);
          setDisabled(true);
        } catch (err) {
          setError(err);
        }
      } else setError(err);
    }
  };

  // const editTimeSchedule = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const data = {
  //       teacher: user._id,
  //       schedule: timeSchedule,
  //     };
  //     const reqData = JSON.stringify(data);
  //     const response = await axios.post("time_schedule/" + user._id, reqData);
  //     alert(response.data.message);
  //   } catch (err) {
  //     setError(err);
  //   }
  // };
  const deleteTimeSchedule = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete("time_schedule/" + id);
      alert(response.data.message);
      setTimeSchedule({});
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="time_schedule">
      <h2>Time Schedule</h2>
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

        {timeSchedule && disabled && (
          <div className="footer">
            <button type="submit" onClick={(e) => setDisabled(false)}>
              <FaEdit /> Edit
            </button>
            <button type="submit" onClick={(e) => deleteTimeSchedule(e)}>
              <FaTrash /> Delete
            </button>
          </div>
        )}
        {!disabled && (
          <button type="submit" onClick={(e) => addTimeSchedule(e)}>
            <FaPlus /> Add
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
