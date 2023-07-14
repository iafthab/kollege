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
      <h2 className="text-violet-950 text-6xl mt-3 mb-2 underline decoration-violet-950 decoration-2 font-bold">
        Students List
      </h2>
      <p className="font-bold text-2xl">{paper.paper}</p>
      {students.length ? (
        <ol className="pl-8 mt-2 text-lg font-medium student__table list-decimal">
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
