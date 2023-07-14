import { useContext, useEffect, useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";
import { FaPlus } from "react-icons/fa";
import { RxUpdate } from "react-icons/rx";

const NotesForm = () => {
  const { paper, notes, noteId, setNoteId } = useContext(UserContext);
  const [note, setNote] = useState({
    paper: paper._id,
    title: "",
    body: "",
  });

  useEffect(() => {
    if (noteId) {
      setNote(notes[noteId]);
    }
  }, [noteId, notes]);

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setNote({
      ...note,
      [e.target.id]: e.target.value,
    });
  };

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("notes/paper/" + paper._id, note);
      setError("");
      navigate("./../");
      toast.success(response.data.message);
    } catch (err) {
      setError(err);
    }
  };

  const updateNote = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch("notes/" + note._id, note);
      navigate("./../../");
      setError("");
      toast.success(response.data.message);
      setNoteId("");
    } catch (err) {
      setError(err);
    }
  };

  return (
    <main className="notes">
      <h2 className="text-violet-950 dark:text-slate-400 underline-offset-4 text-6xl mt-3 dark:mt-0 mb-2 underline decoration-inherit decoration-2 font-bold">
        {noteId ? "Edit Note" : "Add Note"}
      </h2>
      <form>
        <label htmlFor="title" className="block text-lg font-medium">
          Title:
        </label>
        <input
          className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 h-10 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
          type="text"
          id="title"
          required
          value={note.title}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="body" className="block text-lg font-medium">
          Body:
        </label>
        <textarea
          className="w-full outline-none focus:border-violet-900 dark:border-slate-200 mb-4 selection:border-slate-200 block rounded-md p-1 pl-2 border-[1.5px] border-solid border-slate-400 dark:active:border-violet-400 dark:focus:border-violet-400 dark:caret-inherit"
          rows="15"
          type="text"
          id="body"
          required
          value={note.body}
          onChange={(e) => handleFormChange(e)}
        />
        {noteId ? (
          <button
            className="tracking-wide dark:border-violet-300 dark:hover:bg-slate-900 bg-slate-800 font-semibold dark:bg-violet-900 dark:text-violet-100 hover:bg-violet-900 mb-4 focus:bg-violet-900 text-slate-200 h-10 py-2 px-4 border-[1.5px] border-solid flex items-center gap-2 w-auto border-violet-900 rounded-md "
            type="submit"
            onClick={(e) => updateNote(e)}
          >
            <RxUpdate />
            Update Note
          </button>
        ) : (
          <button
            className="tracking-wide dark:border-violet-300 dark:hover:bg-slate-900 bg-slate-800 font-semibold dark:bg-violet-900 dark:text-violet-100 hover:bg-violet-900 mb-4 focus:bg-violet-900 text-slate-200 h-10 py-2 px-4 border-[1.5px] border-solid flex items-center gap-2 w-auto border-violet-900 rounded-md"
            type="submit"
            onClick={(e) => addNote(e)}
          >
            <FaPlus />
            Add Note
          </button>
        )}
      </form>
      <p className="text-center font-medium text-red-700 whitespace-nowrap overflow-hidden text-ellipsis mb-3">
        {error ? error?.response?.data?.message || error?.response?.data : ""}
      </p>
    </main>
  );
};

export default NotesForm;
