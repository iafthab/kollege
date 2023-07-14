import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaTrash, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";

const Notes = () => {
  const { paper, setNoteId, notes, setNotes } = useContext(UserContext);
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

    setNoteId("");
  }, [paper, setNotes, setNoteId]);

  const deleteNote = async (e) => {
    const id = e.currentTarget.id;
    const response = await axios.delete("notes/" + id);
    toast.success(response.data.message, {
      icon: () => <FaTrash />,
    });
  };

  return (
    <main>
      <h2 className="text-violet-950 dark:text-slate-400 underline-offset-4 text-6xl mt-3 dark:mt-0 mb-2 underline decoration-inherit decoration-2 font-bold">
        {paper.paper}
      </h2>
      <ul className="flex items-center justify-start font-semibold gap-16">
        <li className="p-1">BATCH:{paper.year}</li>
        <li className="p-1">SEMESTER:{paper.semester}</li>
        <li className="p-1">
          <Link
            className="underline decoration-violet-900 dark:decoration-inherit  decoration-2 underline-offset-2 hover:decoration-0 hover:bg-violet-950 dark:hover:bg-violet-200 dark:hover:text-violet-950 rounded-md p-2 hover:text-slate-100 "
            to="students"
          >
            STUDENTS
          </Link>
        </li>
        <li className="p-1">
          <Link
            className="underline decoration-violet-900 dark:decoration-inherit   decoration-2 underline-offset-2 hover:decoration-0 hover:bg-violet-950 dark:hover:bg-violet-200 dark:hover:text-violet-950 rounded-md p-2 hover:text-slate-100 "
            to="add"
          >
            ADD NOTE
          </Link>
        </li>
      </ul>

      <hr className="border-b-[1px] mt-3 border-slate-500 " />

      <section className="note__body">
        {notes?.map((note, index) => (
          <article
            className="whitespace bg-violet-200 dark:bg-slate-800 dark:text-slate-300 overflow-hidden-pre-wrap border-2 mt-4 rounded-md border-slate-900 dark:border-slate-500"
            key={index}
          >
            <details className="">
              <summary className="list-none ">
                <div className="flex justify-between">
                  <h3 className="text-lg font-semibold  p-4">{note.title}</h3>
                  <div className="flex p-3 pb-1">
                    <Link
                      to={`${index}/edit`}
                      id={index}
                      onClick={(e) => setNoteId(e.currentTarget.id)}
                    >
                      <FaEdit className="ml-2 text-[2.25rem] rounded-md p-2 pt-1 pr-1 dark:hover:bg-violet-600 hover:bg-violet-900 hover:text-slate-100" />
                    </Link>
                    <Link
                      id={note._id}
                      style={{ color: "rgba(220, 20, 60, 0.8)" }}
                      onClick={(e) => deleteNote(e)}
                    >
                      <FaTrash className="ml-2 text-[2.25rem] rounded-md p-2 dark:text-red-600 text-red-700 hover:bg-red-700 hover:text-slate-100" />
                    </Link>
                  </div>
                </div>
              </summary>
              <hr className="border-b-[1.5px] border-slate-900 dark:border-slate-500 " />
              <pre className="whitespace-pre-wrap font-sans p-4">
                {note.body}
              </pre>
            </details>
          </article>
        ))}
        {!notes.length && !error && (
          <p className="m-4 font-medium">Loading...</p>
        )}
      </section>
      <p className="text-center font-medium text-red-700 whitespace-nowrap overflow-hidden text-ellipsis mb-3">
        {error
          ? error?.response?.data?.message ||
            error?.data?.message ||
            error?.response?.data
          : ""}
      </p>
    </main>
  );
};

export default Notes;
