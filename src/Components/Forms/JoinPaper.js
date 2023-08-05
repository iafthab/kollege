import { useContext, useState, useEffect } from "react";
import UserContext from "../../Hooks/UserContext";
import { Navigate } from "react-router-dom";
import axios from "../../config/api/axios";
import { PiPlusBold, PiMinusBold } from "react-icons/pi";
import { TableHeader } from "../Table";
import Soon from "./../Layouts/Soon";
import Loading from "../Layouts/Loading";
// import { toast } from "react-toastify";

//TODO Refactor
const JoinPaper = () => {
  const { user } = useContext(UserContext);
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNewTeachers = async () => {
      try {
        const response = await axios.get("paper/");
        console.log(response.data);
        setPapers(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNewTeachers();
  }, [user]);

  // TODO
  // const handleJoin = async (e) => {
  //   const index = e.currentTarget.id;
  //   const teacher = users[index];
  //   teacher.roles.push("Teacher");
  //   try {
  //     const response = await axios.patch("/teacher/" + teacher._id, {
  //       id: teacher._id,
  //       roles: teacher.roles,
  //     });
  //     users.splice(index, 1);
  //     toast.success(response.data.message);
  //     setError("");
  //   } catch (err) {
  //     setError(err);
  //     console.log(err);
  //   }
  // };

  // const handleLeave = async (e) => {
  //   const teacher = users[e.currentTarget.id]._id;
  //   try {
  //     const response = await axios.delete("/teacher/" + teacher);
  //     users.splice(e.currentTarget.id, 1);
  //     toast.success(response.data.message, {
  //       icon: ({ theme, type }) => <FaTrash />,
  //     });
  //   } catch (err) {
  //     toast.error(err.message);
  //   }
  // };

  return (
    <>
      {user.role === "student" ? (
        <main>
          <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
            Manage Paper
          </h2>
          <form>
            {papers.length ? (
              <>
                <div className="my-4 w-full overflow-auto rounded-md border-2 border-slate-900 dark:border-slate-500 dark:p-[1px]">
                  <table className="w-full text-left">
                    <TableHeader
                      AdditionalRowClasses={"rounded-t-xl text-left"}
                      Headers={[
                        "Paper",
                        "Department",
                        "Year",
                        "Semester",
                        "Teacher",
                        "Join",
                        "Leave",
                      ]}
                    />
                    <tbody>
                      {papers?.map((paper, index) => (
                        <tr key={index}>
                          <td className="border-t-[1px] border-slate-400 px-4 py-2">
                            {paper.paper}
                          </td>
                          <td className="border-t-[1px] border-slate-400 px-4 py-2">
                            {paper.department}
                          </td>
                          <td className="border-t-[1px] border-slate-400 px-4 py-2">
                            {paper.year}
                          </td>
                          <td className="border-t-[1px] border-slate-400 px-4 py-2">
                            {paper.semester}
                          </td>
                          <td className="border-t-[1px] border-slate-400 px-4 py-2">
                            {paper.teacher.name}
                          </td>
                          <td className="border-t-[1px] border-slate-400 p-0">
                            <button
                              type="button"
                              id={index}
                              // onClick={(e) => handleApprove(e)}
                              className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl hover:bg-violet-900 hover:text-slate-100 dark:text-slate-100 "
                            >
                              <PiPlusBold />
                            </button>
                          </td>
                          <td className="border-t-[1px] border-slate-400 p-0">
                            <button
                              className="m-0 flex h-auto w-full justify-center bg-transparent  py-3 text-xl hover:bg-red-600 hover:text-slate-100 dark:text-slate-100 "
                              type="button"
                              id={index}
                              // onClick={(e) => handleDelete(e)}
                            >
                              <PiMinusBold />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <Soon />
              </>
            ) : (
              <Loading />
            )}
          </form>
          <p className="mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium text-red-700">
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

export default JoinPaper;
