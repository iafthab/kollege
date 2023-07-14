import { useState, useContext, useEffect } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

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
      toast.success(response.data.message);
    } catch (err) {
      if (err.response.status === 409) {
        const response = await axios.patch("time_schedule/" + user._id, data);
        toast.success(response.data.message);
      } else setError(err);
    } finally {
      setDisabled(true);
    }
  };

  const deleteTimeSchedule = async (e) => {
    e.preventDefault();
    const response = await axios.delete("time_schedule/" + id);
    toast.success(response.data.message, {
      icon: ({ theme, type }) => <FaTrash />,
    });
    setTimeSchedule({});
  };

  return (
    <main className="time_schedule">
      <h2 className="text-violet-950 text-6xl mt-3 mb-2 underline decoration-violet-950 decoration-2 font-bold">
        Time Schedule
      </h2>
      <form>
        {timeSchedule.monday ? (
          <div className="rounded-md border-2 border-slate-900 my-4 w-full">
            <table className=" w-full text-center">
              <thead>
                <tr className="text-lg bg-slate-900 h-[3rem] p-4 text-slate-100">
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
                    <tr key={key}>
                      <th className="py-4 text-base border-none px-4 bg-slate-900 text-slate-100 capitalize">
                        {key}
                      </th>
                      {value.map((day, index) => (
                        <td
                          className="p-1 border-t-[1px] border-l-[1px] border-slate-400 first:border-none"
                          id="table__td"
                          key={index}
                        >
                          <select
                            className="bg-slate-50 h-[3rem] w-full leading-6 select-img appearance-none focus:border-0 text-center"
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
          </div>
        ) : (
          <p className="m-4 font-medium">Loading...</p>
        )}

        {timeSchedule.monday && disabled && (
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-slate-800 flex font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-4 px-6 gap-2 items-center w-auto rounded-md"
              onClick={() => setDisabled(false)}
            >
              <FaEdit /> Edit
            </button>
            <button
              type="submit"
              className="bg-slate-800 flex font-semibold hover:bg-red-700 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 p-4 gap-2 items-center w-auto rounded-md"
              onClick={(e) => deleteTimeSchedule(e)}
            >
              <FaTrash /> Delete
            </button>
          </div>
        )}
        {!disabled && (
          <button
            type="submit"
            className="bg-slate-800 flex font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-4 px-6 gap-2 items-center w-auto rounded-md "
            onClick={(e) => addTimeSchedule(e)}
          >
            <FaPlus /> Save
          </button>
        )}
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

export default TimeScheduleForm;
