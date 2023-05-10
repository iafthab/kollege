import axios from "../../config/api/axios";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";

const Paper = () => {
  const { user, setPaper } = useContext(UserContext);
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPapers = async () => {
      try {
        const response = await axios.get("paper/teacher/" + user._id);
        setPapers(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getPapers();
  }, [user]);

  return (
    <main className="paper">
      <h2>Papers</h2>
      <section className="paper__body">
        {papers.map((paper, index) => (
          <Link to={paper.paper} key={index} onClick={() => setPaper(paper)}>
            <article className="paper__container">
              <h3 className="paper__name">{paper.paper}</h3>
              <hr />
              <p>{paper.year}</p>
            </article>
          </Link>
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

export default Paper;
