import { useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const NotesForm = () => {
  const [note, setNote] = useState({
    paper: "644a939514c3d1754e6c6ffb",
    title: "",
    body: "",
  });
  const navigate = useNavigate();

  const [error, setError] = useState("");

  const handleFormChange = (e) => {
    setNote({
      ...note,
      [e.target.id]: e.target.value,
    });
  };

  const addNote = async (e) => {
    e.preventDefault();
    try {
      const reqData = JSON.stringify(note);
      const response = await axios.post(
        "notes/644a939514c3d1754e6c6ffb",
        reqData
      );
      console.log(response);
      setError("");
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
      console.log(error);
    }
  };

  return (
    <main className="notes">
      <h2>Add Notes</h2>
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
          rows="7"
          type="text"
          id="body"
          required
          value={note.body}
          onChange={(e) => handleFormChange(e)}
        />
        <button type="submit" onClick={(e) => addNote(e)}>
          Add Note
        </button>
      </form>
      <p className="form__error">
        {error ? error?.response?.data?.message || error?.response?.data : ""}
      </p>
    </main>
  );
};

export default NotesForm;
