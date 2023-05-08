import { useState, useEffect } from "react";
import axios from "../../config/api/axios";
import { useLocation, Link } from "react-router-dom";

const Notes = () => {
  //TODO Check location for paperName
  const location = useLocation().pathname;
  const [paper, setPaper] = useState({});
  const [notes, setNotes] = useState({});
  const [error, setError] = useState("");

  useEffect(() => {
    const getPaper = async () => {
      const response = await axios.get(location);
      setPaper(response.data);
      console.log(response.data);
    };
    getPaper();

    const getNotes = async () => {
      try {
        const response = await axios.get("/notes" + location);
        console.log(response);
        setNotes(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getNotes();
  }, [location]);

  return (
    <main className="notes">
      <h2>{paper.paper}</h2>
      <p>
        year:{paper.year} semester:{paper.semester}
        <br />
        <Link to="students">Students</Link>
        <Link to="add">Add Note</Link>
      </p>

      <hr />
      {/* <section className="note__body">
        {notes.map((note, index) => (
          <article className="note__container" key={index}>
            <h3 className="note__name">{note.title}</h3>
            <hr />
            <p>{note.body}</p>
          </article>
        ))}
      </section> */}
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
