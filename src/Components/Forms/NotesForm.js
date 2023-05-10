import { useContext, useState } from "react";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";

const NotesForm = () => {
  const { paper } = useContext(UserContext);
  const [note, setNote] = useState({
    paper: paper._id,
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
      const response = await axios.post("notes/paper/" + paper._id, reqData);
      setError("");
      navigate("../");
      alert(response.data.message);
    } catch (err) {
      setError(err);
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
          rows="8"
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
