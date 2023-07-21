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
      <h2 className="mb-2 mt-3 whitespace-break-spaces text-4xl font-bold text-violet-950 underline decoration-inherit decoration-2 underline-offset-4 dark:mt-0 dark:text-slate-400 md:text-6xl">
        {paper.paper}
      </h2>
      <ul className="grid grid-cols-2 justify-normal font-semibold lg:flex lg:items-center lg:justify-start lg:gap-16">
        <li className="p-1">BATCH:{paper.year}</li>
        <li className="p-1">SEMESTER:{paper.semester}</li>
        <li className="p-1">
          <Link
            className="rounded-md underline decoration-violet-900  decoration-2 underline-offset-2 hover:bg-violet-950 hover:text-slate-100 hover:decoration-0 dark:decoration-inherit dark:hover:bg-violet-200 dark:hover:text-violet-950 lg:p-2 "
            to="students"
          >
            STUDENTS
          </Link>
        </li>
        <li className="p-1">
          <Link
            className="rounded-md underline decoration-violet-900   decoration-2 underline-offset-2 hover:bg-violet-950 hover:text-slate-100 hover:decoration-0 dark:decoration-inherit dark:hover:bg-violet-200 dark:hover:text-violet-950 lg:p-2 "
            to="add"
          >
            ADD NOTE
          </Link>
        </li>
      </ul>

      <hr className="mt-3 border-b-[1px] border-slate-500 " />

      <section className="note__body">
        {notes?.map((note, index) => (
          <article
            className="mt-4 overflow-auto whitespace-break-spaces rounded-md border-2 border-slate-900 bg-violet-200 dark:border-slate-500 dark:bg-slate-800 dark:text-slate-300"
            key={index}
          >
            <details className="">
              <summary className="list-none ">
                <div className="flex justify-between">
                  <h3 className="p-4 text-lg  font-semibold">{note.title}</h3>
                  <div className="flex p-3 pb-1">
                    <Link
                      to={`${index}/edit`}
                      id={index}
                      onClick={(e) => setNoteId(e.currentTarget.id)}
                    >
                      <FaEdit className="ml-2 rounded-md pr-1 pt-1 text-[2.25rem] hover:bg-violet-900 hover:text-slate-100 dark:hover:bg-violet-600 lg:p-2" />
                    </Link>
                    <Link
                      id={note._id}
                      style={{ color: "rgba(220, 20, 60, 0.8)" }}
                      onClick={(e) => deleteNote(e)}
                    >
                      <FaTrash className="ml-2 rounded-md text-[2.25rem] text-red-700 hover:bg-red-700 hover:text-slate-100 dark:text-red-600 lg:p-2" />
                    </Link>
                  </div>
                </div>
              </summary>
              <hr className="border-b-[1.5px] border-slate-900 dark:border-slate-500 " />
              <pre className="whitespace-pre-wrap p-4 font-sans">
                {note.body}
              </pre>
            </details>
          </article>
        ))}
        {!notes.length && !error && (
          <p className="m-4 font-medium">Loading...</p>
        )}
      </section>
      <p className="mb-3 overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium text-red-700">
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
