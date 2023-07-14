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
      <h2 className="text-violet-950 text-6xl mt-3 mb-2 underline decoration-violet-950 decoration-2 font-bold">
        {noteId ? "Edit Note" : "Add Note"}
      </h2>
      <form>
        <label htmlFor="title" className="block text-lg font-medium">
          Title:
        </label>
        <input
          className="w-full outline-none text-md leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-2 h-10 border-[1.5px] border-solid border-slate-400 text-slate-900  "
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
          className="w-full outline-none text-md leading-6 focus:border-violet-900 mb-4 selection:border-[1.5px] block rounded-md p-2 border-[1.5px] border-solid border-slate-400 text-slate-900  "
          rows="8"
          type="text"
          id="body"
          required
          value={note.body}
          onChange={(e) => handleFormChange(e)}
        />
        {noteId ? (
          <button
            className="bg-slate-800 font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-2 px-4 border-[1.5px] border-solid flex items-center gap-2 w-auto border-violet-900 rounded-md "
            type="submit"
            onClick={(e) => updateNote(e)}
          >
            <RxUpdate />
            Update Note
          </button>
        ) : (
          <button
            className="bg-slate-800 flex items-center gap-2 font-semibold hover:bg-violet-900 mb-4 focus:bg-violet-900 dark:text-slate-900 text-slate-200 h-10 py-2 px-4 border-[1.5px] border-solid w-auto border-violet-900 rounded-md "
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
