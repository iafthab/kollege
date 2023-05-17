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
      <h2>Students</h2>
      <ol className="student__table">
        {students?.map((student, index) => (
          <li key={index}>{student.name}</li>
        ))}
      </ol>
    </main>
  );
};

export default StudentsList;
