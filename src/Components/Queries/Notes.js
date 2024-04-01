import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import Loading from "../Layouts/Loading";
import ErrorStrip from "../ErrorStrip";

const Notes = () => {
  const { paper, notes, setNotes, user } = useContext(UserContext);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("notes/paper/" + paper._id);
        setNotes(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNotes();
    return () => setNotes([]);
  }, [paper, setNotes]);

  const deleteNote = async (e) => {
    const id = e.currentTarget.id;
    const response = await axios.delete("notes/" + id);
    const newNotes = notes.filter((note) => note._id !== id);
    setNotes(newNotes);
    toast.success(response.data.message, {
      icon: () => <FaTrash />,
    });
  };

  return (
    <main>
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        {paper.paper}
      </h2>
      <ul className="grid grid-cols-1 font-semibold sm:grid-cols-2 lg:flex lg:items-center lg:justify-start lg:gap-16">
        <li className="p-1">Batch : {paper.year}</li>
        <li className="p-1">Semester : {paper.semester}</li>
        {user.userType === "student" && (
          <li className="p-1">Teacher : {paper.teacher.name}</li>
        )}
        <li>
          <Link
            className="rounded-md px-2 py-1 underline decoration-violet-900  decoration-2 underline-offset-2 hover:bg-violet-950 hover:text-slate-100 hover:decoration-0 dark:decoration-inherit dark:hover:bg-violet-900/80 dark:hover:text-slate-200 md:p-2 "
            to="students"
          >
            Students
          </Link>
        </li>
        {user.userType === "staff" && (
          <li>
            <Link
              className="rounded-md px-2 py-1 underline decoration-violet-900   decoration-2 underline-offset-2 hover:bg-violet-950 hover:text-slate-100 hover:decoration-0 dark:decoration-inherit dark:hover:bg-violet-900/80 dark:hover:text-slate-200 md:p-2 "
              to="add"
            >
              Add Note
            </Link>
          </li>
        )}
      </ul>

      <hr className="mt-3 border-b-[1px] border-slate-500 " />

      <section className="note__body w-full ">
        {notes?.map((note, index) => (
          <article
            className="mt-4 overflow-auto whitespace-break-spaces rounded-md  bg-violet-300 hover:bg-violet-400/60 dark:bg-slate-800/70 dark:hover:bg-slate-800 duration-300 dark:text-slate-300"
            key={index}
          >
            <details className="duration-200">
              <summary className="list-none duration-200">
                <div className="flex justify-between">
                  <h3 className="p-4 text-lg  font-semibold">{note.title}</h3>
                  {user.userType === "staff" && (
                    <div className="flex p-3 pb-1">
                      <Link to={`${index}/edit`} id={index}>
                        <FaEdit className="ml-2 duration-200 rounded-md p-1 text-3xl hover:bg-violet-900 hover:text-slate-100 dark:hover:bg-violet-600 lg:p-2 lg:text-4xl" />
                      </Link>
                      <Link
                        id={note._id}
                        style={{ color: "rgba(220, 20, 60, 0.8)" }}
                        onClick={(e) => deleteNote(e)}
                      >
                        <FaTrash className="ml-2 duration-200 rounded-md p-1 text-3xl text-red-700 hover:bg-red-700 hover:text-slate-100 dark:text-red-700/70 lg:p-2 lg:text-4xl" />
                      </Link>
                    </div>
                  )}
                </div>
              </summary>
              <hr className="border-b-[1.5px] border-violet-900 dark:border-slate-500 " />
              <pre className="whitespace-pre-wrap p-4 font-sans">
                {note.body}
              </pre>
            </details>
          </article>
        ))}
        {!notes.length && !error ? <Loading /> : ""}
      </section>
      {error ? <ErrorStrip error={error} /> : ""}
    </main>
  );
};

export default Notes;
