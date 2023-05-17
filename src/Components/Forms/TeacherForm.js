import { useState } from "react";
import axios from "../../config/api/axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUniversity } from "react-icons/fa";

const TeacherForm = () => {
  const navigate = useNavigate();
  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    qualification: "",
    department: "",
    roles: [],
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value,
    });
  };

  //TODO Fetch departments and map
  const addTeacher = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(teacher);
      const response = await axios.post("teacher", reqData);
      console.log(response.data.message);
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="register">
      <div className="teacher">
        <section className="register__head">
          <h2>
            Teacher
            <br /> Registration
          </h2>
          <Link to="../">
            <FaUniversity />
            KOLLEGE
          </Link>
        </section>
        <form>
          <label htmlFor="name">name:</label>
          <input
            type="text"
            name="name"
            required
            id="name"
            value={teacher.name}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="email">email:</label>
          <input
            type="text"
            required
            id="email"
            name="email"
            value={teacher.email}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="qualification">qualification:</label>
          <input
            type="text"
            required
            name="qualification"
            id="qualification"
            value={teacher.qualification}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="department">department:</label>
          <input
            type="text"
            name="department"
            required
            id="department"
            value={teacher.department}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="username">username:</label>
          <input
            name="username"
            type="text"
            required
            id="username"
            value={teacher.username}
            onChange={(e) => handleFormChange(e)}
          />
          <label htmlFor="password">password:</label>
          <input
            type="password"
            name="password"
            id="password"
            value={teacher.password}
            required
            onChange={(e) => handleFormChange(e)}
          />
          <button type="submit" onClick={(e) => addTeacher(e)}>
            Register
          </button>
        </form>
        <p className="form__error">
          {error
            ? error?.response?.data?.message ||
              error?.data?.message ||
              error?.response?.data
            : ""}
        </p>
      </div>
    </main>
  );
};

export default TeacherForm;
