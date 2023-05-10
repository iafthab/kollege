import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import axios from "../../config/api/axios";

const StudentsList = () => {
  const { paper } = useContext(UserContext);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudentsList = async (e) => {
      const list = await axios.get("/student/list/" + paper._id);
      const students = list.data[0];
      console.log(students);
      setStudents(students.students);
      console.log(list.data);
    };
    getStudentsList();
  }, [paper]);
  return (
    <main className="student">
      <h2>Students</h2>
      <ol className="student__table">
        {students?.map((student) => (
          <li>{student.name}</li>
        ))}
      </ol>
    </main>
  );
};

export default StudentsList;
