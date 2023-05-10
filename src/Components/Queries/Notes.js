import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";

const Notes = () => {
  const { paper } = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await axios.get("/notes/paper/" + paper._id);
        setNotes(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNotes();
  }, [paper]);

  return (
    <main className="notes">
      <h2>{paper.paper}</h2>
      <ul className="notes__list">
        <li>YEAR:{paper.year}</li>
        <li>SEMESTER:{paper.semester}</li>
        <li>
          <Link to="students">STUDENTS</Link>
        </li>
        <li>
          <Link to="add">ADD NOTE</Link>
        </li>
      </ul>

      <hr />
      <section className="note__body">
        {notes?.map((note, index) => (
          <article className="note__container" key={index}>
            <h3 className="note__name">{note.title}</h3>
            <hr />
            <p>{note.body}</p>
          </article>
        ))}
      </section>
      <p className="form__error">
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
