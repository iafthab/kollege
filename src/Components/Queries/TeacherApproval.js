import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import { Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import { FaPlus, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const TeacherApproval = () => {
  const { user } = useContext(UserContext);
  const [newTeachers, setNewTeachers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewTeachers = async () => {
      try {
        const response = await axios.get("teacher/approve/" + user.department);
        setNewTeachers(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNewTeachers();
  }, [user]);

  const handleApprove = async (e) => {
    const index = e.currentTarget.id;
    const teacher = newTeachers[index];
    teacher.role = "teacher";
    try {
      const response = await axios.patch("/teacher/" + teacher._id, {
        id: teacher._id,
        role: teacher.role,
      });
      newTeachers.splice(index, 1);
      toast.success(response.data.message);
      setError("");
    } catch (err) {
      setError(err);
    }
  };

  const handleDelete = async (e) => {
    const teacher = newTeachers[e.currentTarget.id]._id;
    try {
      const response = await axios.delete("/teacher/" + teacher);
      newTeachers.splice(e.currentTarget.id, 1);
      toast.success(response.data.message, {
        icon: ({ theme, type }) => <FaTrash />,
      });
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <>
      {user.role === "HOD" ? (
        <main className="teacher__approval">
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Approve Teacher
          </h2>
          <h3 className="text-2xl font-semibold">
            Department: {user.department}
          </h3>
          <form>
            {newTeachers.length ? (
              <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                <table className="w-full">
                  <thead>
                    <tr className="rounded-t-xl bg-slate-900 text-base text-slate-100">
                      <th className="p-2 ">Name</th>
                      <th className="p-2 ">Email</th>
                      <th className="p-2 ">Qualification</th>
                      <th className="p-2 ">Username</th>
                      <th className="p-2 ">Approve</th>
                      <th className="p-2 ">Reject</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newTeachers?.map((teacher, index) => (
                      <tr key={index}>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {teacher.name}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {teacher.email}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {teacher.qualification}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-2">
                          {teacher.username}
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <button
                            type="button"
                            id={index}
                            onClick={(e) => handleApprove(e)}
                            className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl text-slate-100 hover:bg-violet-900 "
                          >
                            <FaPlus />
                          </button>
                        </td>
                        <td className="border-t-[1px] border-slate-400 p-0">
                          <button
                            className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl text-slate-100 hover:bg-red-600 "
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
              ""
            )}
            {!newTeachers.length && !error && <Loading />}
          </form>
          {error ? <ErrorStrip error={error} /> : ""}
        </main>
      ) : (
        <Navigate to="/dash" />
      )}
    </>
  );
};

export default TeacherApproval;
