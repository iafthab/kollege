import { useContext, useEffect, useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { toast } from "react-toastify";

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
      {noteId ? <h2>Edit Note</h2> : <h2>Add Note</h2>}
      <form>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          required
          value={note.title}
          onChange={(e) => handleFormChange(e)}
        />
        <label htmlFor="body">Body:</label>
        <textarea
          rows="8"
          type="text"
          id="body"
          required
          value={note.body}
          onChange={(e) => handleFormChange(e)}
        />
        {noteId ? (
          <button type="submit" onClick={(e) => updateNote(e)}>
            Update Note
          </button>
        ) : (
          <button type="submit" onClick={(e) => addNote(e)}>
            Add Note
          </button>
        )}
      </form>
      <p className="form__error">
        {error ? error?.response?.data?.message || error?.response?.data : ""}
      </p>
    </main>
  );
};

export default NotesForm;
