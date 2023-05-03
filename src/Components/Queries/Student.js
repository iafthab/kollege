import { useState } from "react";
// import { FaCheck, FaTimes, FaInfoCircle } from "react-icons/fa";

const StudentForm = () => {
  const { student, setStudent } = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    course: "",
    batch: "",
    admission_no: "",
    password: "",
  });

  //TODO Fetch departments,course,batch and map

  return (
    <main className="student">
      <h2>Student Registration</h2>
      <form>
        <label htmlFor="name">name:</label>
        <input
          type="text"
          id="name"
          value={student.name}
          onChange={(e) => setStudent.name(e.target.value)}
        />
        <label htmlFor="email">email:</label>
        <input
          type="text"
          id="email"
          value={student.email}
          onChange={(e) => setStudent.email(e.target.value)}
        />
        <label htmlFor="phone">phone:</label>
        <input
          type="text"
          id="phone"
          value={student.phone}
          onChange={(e) => setStudent.phone(e.target.value)}
        />
        <label htmlFor="department">department:</label>
        <input
          type="radio"
          id="department"
          value={student.department}
          onChange={(e) => setStudent.department(e.target.value)}
        />
        <label htmlFor="course">course:</label>
        <input
          type="text"
          id="course"
          value={student.course}
          onChange={(e) => setStudent.course(e.target.value)}
        />
        <label htmlFor="batch">batch:</label>
        <input
          type="text"
          id="batch"
          value={student.batch}
          onChange={(e) => setStudent.batch(e.target.value)}
        />
        <label htmlFor="admission_no">admission no:</label>
        <input
          type="text"
          id="admission_no"
          value={student.admission_no}
          onChange={(e) => setStudent.admission_no(e.target.value)}
        />
        <label htmlFor="password">password:</label>
        <input
          type="text"
          id="password"
          value={student.password}
          onChange={(e) => setStudent.password(e.target.value)}
        />
      </form>
    </main>
  );
};

export { StudentForm };
