import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";

const StudentsList = () => {
  const { paper } = useContext(UserContext);
  const [students, setStudents] = useState([]);

  //TODO Add CSS

  useEffect(() => {
    const getStudentsList = async (e) => {
      const list = await axios.get("/student/list/" + paper._id);
      const students = list.data[0];
      setStudents(students.students);
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
        <p className="m-4 font-medium">Loading...</p>
      )}
    </main>
  );
};

export default StudentsList;
