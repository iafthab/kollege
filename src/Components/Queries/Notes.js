import { useState, useEffect, useContext } from "react";
import axios from "../../config/api/axios";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { FaTrash, FaEdit } from "react-icons/fa";

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
  }, [paper, setNotes]);

  const deleteNote = async (e) => {
    const id = e.currentTarget.id;
    const response = await axios.delete("notes/" + id);
    alert(response.data.message);
  };

  return (
    <main className="notes">
      <h2>{paper.paper}</h2>
      <ul className="notes__list">
        <li>BATCH:{paper.year}</li>
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
            <details>
              <summary>
                <div className="note__head">
                  <h3 className="note__name">{note.title}</h3>
                  <div className="note__icons">
                    <Link
                      to={`${index}/edit`}
                      id={index}
                      onClick={(e) => setNoteId(e.currentTarget.id)}
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      id={note._id}
                      style={{ color: "rgba(220, 20, 60, 0.8)" }}
                      onClick={(e) => deleteNote(e)}
                    >
                      <FaTrash />
                    </Link>
                  </div>
                </div>
              </summary>
              <hr />
              <pre>{note.body}</pre>
            </details>
          </article>
        ))}
        {!notes.length && <p>No Notes Found</p>}
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
