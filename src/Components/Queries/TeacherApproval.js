import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import { Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const TeacherApproval = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewTeachers = async () => {
      try {
        const response = await axios.get("teacher/approve/" + user.department);
        setUsers(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNewTeachers();
  }, [user]);

  const handleApprove = async (e) => {
    const index = e.currentTarget.id;
    const teacher = users[index];
    teacher.roles.push("Teacher");
    try {
      const response = await axios.patch("/teacher/" + teacher._id, {
        id: teacher._id,
        roles: teacher.roles,
      });
      users.splice(index, 1);
      toast.success(response.data.message);
      setError("");
    } catch (err) {
      setError(err);
      console.log(err);
    }
  };

  const handleDelete = async (e) => {
    const teacher = users[e.currentTarget.id]._id;
    try {
      const response = await axios.delete("/teacher/" + teacher);
      users.splice(e.currentTarget.id, 1);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {user.isHOD ? (
        <main className="teacher__approval">
          <h2 className="text-violet-950 dark:text-slate-400 underline-offset-4 text-6xl mt-3 dark:mt-0 mb-2 underline decoration-inherit decoration-2 font-bold">
            Approve Teacher
          </h2>
          <h3 className="text-2xl font-semibold">
            Department: {user.department}
          </h3>
          <form>
            {users.length ? (
              <div className="rounded-md border-2 dark:border-slate-500 dark:p-[1px] border-slate-900 my-4 w-full">
                <table className="w-full">
                  <thead>
                    <tr className="text-base rounded-t-xl bg-slate-900 text-slate-100">
                      <th className="p-2 ">Name</th>
                      <th className="p-2 ">Email</th>
                      <th className="p-2 ">Qualification</th>
                      <th className="p-2 ">Username</th>
                      <th className="p-2 ">Approve</th>
                      <th className="p-2 ">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users?.map((teacher, index) => (
                      <tr key={index}>
                        <td className="p-2 border-t-[1px] border-slate-400">
                          {teacher.name}
                        </td>
                        <td className="p-2 border-t-[1px] border-slate-400">
                          {teacher.email}
                        </td>
                        <td className="p-2 border-t-[1px] border-slate-400">
                          {teacher.qualification}
                        </td>
                        <td className="p-2 border-t-[1px] border-slate-400">
                          {teacher.username}
                        </td>
                        <td className="p-0 border-t-[1px] border-slate-400">
                          <button
                            type="button"
                            id={index}
                            onClick={(e) => handleApprove(e)}
                            className="bg-transparent py-3 h-auto text-xl m-0 hover:bg-violet-900  text-slate-100 w-full flex justify-center "
                          >
                            <FaPlus />
                          </button>
                        </td>
                        <td className="p-0 border-t-[1px] border-slate-400">
                          <button
                            className="bg-transparent py-3 h-auto text-xl m-0 hover:bg-red-600  text-slate-100 w-full flex justify-center "
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
              </div>
            ) : (
              <p className="m-4 font-medium">Loading...</p>
            )}
          </form>
          <p className="text-center font-medium text-red-700 whitespace-nowrap overflow-hidden text-ellipsis mb-3">
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
