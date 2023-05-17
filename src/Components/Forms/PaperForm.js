import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { useNavigate, Navigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";

const PaperForm = () => {
  const { user } = useContext(UserContext);
  const [paper, setPaper] = useState({
    department: user.department,
    paper: "",
    year: "2023",
    students: [],
    semester: "Select Semester",
    teacher: "",
  });
  const [teachers, setTeachers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch teachers
  useEffect(() => {
    const getTeachers = async (e) => {
      const list = await axios.get("/teacher/list");
      setTeachers(list.data);
    };
    getTeachers();
  }, []);

  const addPaper = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("paper", JSON.stringify(paper));
      navigate("./../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const handleFormChange = (e) => {
    setPaper({
      ...paper,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <>
      {user.isHOD ? (
        <main className="paper">
          <h2>Add Paper</h2>
          <form className="paper__form">
            <label htmlFor="department">department:</label>
            <input
              name="department"
              type="text"
              required
              id="department"
              value={paper.department}
              disabled
            />
            <label htmlFor="paper">paper:</label>
            <input
              type="text"
              name="paper"
              id="paper"
              value={paper.paper}
              required
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="semester">semester:</label>
            <select
              id="semester"
              value={paper.semester}
              required
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Semester
              </option>
              <option value="I">I</option>
              <option value="II">II</option>
              <option value="III">III</option>
              <option value="IV">IV</option>
              <option value="V">V</option>
              <option value="VI">VI</option>
            </select>
            <label htmlFor="year">year:</label>
            <input
              type="number"
              min="2000"
              max="2030"
              step="1"
              required
              id="year"
              value={paper.year}
              onChange={(e) => handleFormChange(e)}
            />
            <label htmlFor="teacher">teacher:</label>
            <select
              required
              id="teacher"
              name="teacher"
              value={paper.teacher}
              onChange={(e) => handleFormChange(e)}
            >
              <option defaultValue hidden>
                Select Teacher
              </option>
              {teachers?.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                  {teacher.name}
                </option>
              ))}
            </select>
            <button type="submit" onClick={(e) => addPaper(e)}>
              Add
            </button>
          </form>
          <p className="form__error">
            {error
              ? error?.response?.data?.message ||
                error?.data?.message ||
                error?.response?.data
              : ""}
          </p>
        </main>
      ) : (
        <Navigate to="/" replace={true} />
      )}
    </>
  );
};

export default PaperForm;
