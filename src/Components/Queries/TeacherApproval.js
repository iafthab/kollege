import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import { Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import { FaPlus, FaTrash } from "react-icons/fa";

const TeacherApproval = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("teacher/approve/" + user.department);
        setUsers(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getUsers();
  }, [user]);

  const handleApprove = async (e) => {
    const index = e.currentTarget.id;
    const teacher = users[index];
    teacher.roles.push("Teacher");
    try {
      const response = await axios.patch("/teacher", {
        id: teacher._id,
        roles: teacher.roles,
      });
      alert(response.data.message);
      setError("");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    const teacher = users[e.currentTarget.id];
    console.log(teacher);
    const response = await axios.delete("/teacher", { id: teacher._id });
    console.log(response.data);
    alert(response.data.message);
  };

  return (
    <>
      {user.isHOD ? (
        <main className="teacher__approval">
          <h2>Approve Teacher</h2>
          <h3>Department: {user.department}</h3>
          <form>
            {users.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Qualification</th>
                    <th>Username</th>
                    <th>Approve</th>
                    <th>Reject</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((teacher, index) => (
                    <tr key={index}>
                      <td>{teacher.name}</td>
                      <td>{teacher.email}</td>
                      <td>{teacher.qualification}</td>
                      <td>{teacher.username}</td>
                      <td>
                        <button
                          type="button"
                          id={index}
                          onClick={(e) => handleApprove(e)}
                          className="plus_btn"
                        >
                          <FaPlus />
                        </button>
                      </td>
                      <td>
                        <button
                          className="delete_btn"
                          type="button"
                          id={index}
                          onClick={(e) => handleDelete(e)}
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              ""
            )}
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
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default TeacherApproval;
