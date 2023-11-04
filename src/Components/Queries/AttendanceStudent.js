import { useState, useContext } from "react";
import axios from "../../config/api/axios";
import UserContext from "../../Hooks/UserContext";
import { TableHeader } from "../Table";
import ErrorStrip from "../ErrorStrip";

const AttendanceStudent = () => {
  const { user } = useContext(UserContext);
  const [attendance, setAttendance] = useState([]);
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  // fetching Attendance
  const fetchAttendance = async (e) => {
    e.preventDefault();
    setAttendance([]);
    setError("");
    try {
      const response = await axios.get(
        `/attendance/student/${user._id}/${date}`
      );
      setAttendance(response.data);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="attendance">
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        Attendance
      </h2>
      <section className="attendance__head">
        <form className="w-full gap-4 accent-violet-900 md:flex ">
          <div className="flex w-fit flex-col">
            <label className="m-1" htmlFor="date">
              Select Date
            </label>
            <input
              className="mb-4 block h-10 w-full rounded-md border-[1.5px] border-solid border-slate-400 p-1 pl-2 outline-none selection:border-slate-200 focus:border-violet-900 dark:border-slate-200 dark:caret-inherit dark:focus:border-violet-400 dark:active:border-violet-400"
              id="date"
              placeholder="Select Date"
              type="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button
              className="mb-4 h-10 rounded-md border-[1.5px] border-solid border-violet-900 bg-slate-800 px-8 py-2 font-semibold tracking-wide text-slate-200 hover:bg-violet-900 focus:bg-violet-900 disabled:cursor-not-allowed dark:border-violet-300 dark:bg-violet-900 dark:text-violet-100 dark:hover:bg-slate-900 md:w-auto"
              type="submit"
              onClick={(e) => fetchAttendance(e)}
            >
              Fetch
            </button>
          </div>
        </form>
      </section>
      <div>{error ? <ErrorStrip error={error} /> : ""}</div>
      <section className="attendance__form">
        <form className="w-full">
          {attendance?.length ? (
            <div className="my-4 w-full rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px] lg:w-1/2">
              <table className="w-full text-center">
                <TableHeader Headers={["Hour", "Paper", "Present"]} />
                <tbody>
                  {attendance?.map((period, index) => (
                    <tr
                      key={index}
                      className={
                        period.attendance.present
                          ? "border-t-[1px] border-slate-400 bg-violet-900/50 first:border-none"
                          : "border-t-[1px] border-slate-400"
                      }
                    >
                      <td className="p-2">{period.hour}</td>
                      <td className="whitespace-break-spaces p-2">
                        {period.paper.paper}
                      </td>
                      <td className="p-2">
                        {period.attendance.present ? "Present" : "Absent"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            ""
          )}
        </form>
      </section>
    </main>
  );
};
export default AttendanceStudent;
