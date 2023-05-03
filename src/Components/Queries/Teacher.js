import { useState } from "react";
// import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const Teacher = () => {
  const { teacher, setTeacher } = useState({
    username: "",
    name: "",
    password: "",
    email: "",
    phone: "",
    qualification: "",
    department: "",
    roles: ["Teacher"],
    advisor: "none",
  });

  //TODO Fetch departments and map

  return (
    <main className="teacher">
      <h2>Teacher Registration</h2>
      <form>
        <label htmlFor="username">username:</label>
        <input
          type="text"
          id="username"
          value={teacher.username}
          onChange={(e) => setTeacher.username(e.target.value)}
        />
        <label htmlFor="password">password:</label>
        <input
          type="text"
          id="password"
          value={teacher.password}
          onChange={(e) => setTeacher.password(e.target.value)}
        />
        <label htmlFor="name">name:</label>
        <input
          type="text"
          id="name"
          value={teacher.name}
          onChange={(e) => setTeacher.name(e.target.value)}
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          value={teacher.email}
          onChange={(e) => setTeacher.email(e.target.value)}
        />
        <label htmlFor="phone">phone:</label>
        <input
          type="text"
          id="phone"
          value={teacher.phone}
          onChange={(e) => setTeacher.phone(e.target.value)}
        />
        <label htmlFor="qualification">qualification:</label>
        <input
          type="text"
          id="qualification"
          value={teacher.qualification}
          onChange={(e) => setTeacher.qualification(e.target.value)}
        />
        <label htmlFor="department">department:</label>
        <input
          type="radio"
          id="department"
          value={teacher.department}
          onChange={(e) => setTeacher.department(e.target.value)}
        />
      </form>
    </main>
  );
};

export default Teacher;
