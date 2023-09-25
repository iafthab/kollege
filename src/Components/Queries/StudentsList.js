import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";
import Loading from "../Layouts/Loading";

const StudentsList = () => {
  const { paper } = useContext(UserContext);
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStudentsList = async (e) => {
      try {
        const response = await axios.get("/paper/students/" + paper._id);
        // TODO Move to backend
        if (!response.data.length) {
          setError({
            response: {
              data: "No Students found",
            },
          });
        }
        setStudents(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getStudentsList();
  }, [paper]);
  return (
    <main className="student">
      <h2 className="mb-2 mt-3 text-6xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400">
        Students List
      </h2>
      <p className="text-2xl font-bold">{paper.paper}</p>
      {students.length ? (
        <ol className="student__table mt-2 list-decimal pl-8 text-lg font-medium">
          {students?.map((student, index) => (
            <li key={index}>{student.name}</li>
          ))}
        </ol>
      ) : (
        ""
      )}
      {!students.length && !error && <Loading />}

      <div>
        <p className="mb-3 overflow-hidden text-ellipsis whitespace-break-spaces text-center font-medium text-red-700">
          {error ? error?.response?.data?.message || error?.response?.data : ""}
        </p>
      </div>
    </main>
  );
};

export default StudentsList;
