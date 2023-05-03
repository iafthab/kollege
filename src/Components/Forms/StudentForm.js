import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const StudentForm = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    papers: [],
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setStudent({
      ...student,
      [e.target.id]: e.target.value,
    });
  };

  const addStudent = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(student);
      const response = await axios.post("student", reqData);
      console.log(response);
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
    }
    console.log(error);
  };

  return (
    <main className="student">
      <h2>Student Registration</h2>
      <form>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          required
          id="name"
          value={student.name}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          required
          id="email"
          value={student.email}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          required
          value={student.username}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="password">password:</label>
        <input
          type="password"
          id="password"
          value={student.password}
          onChange={(e) => handleFormChange(e)}
          required
        />
        <button type="submit" onClick={(e) => addStudent(e)}>
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
  );
};

export default StudentForm;
