import axios from "../../config/api/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Paper = () => {
  const [papers, setPapers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const getPapers = async () => {
      try {
        const response = await axios.get(
          "paper/teacher/644e4f27cce0a7d6a232420e"
        );
        console.log(response);
        setPapers(response.data);
      } catch (err) {
        setError(err);
      }
    };
    getPapers();
  }, []);

  //TODO Fetch student(s) and map

  return (
    <main className="paper">
      <h2>Papers</h2>
      <hr />
      <section className="paper__body">
        {papers.map((paper, index) => (
          <Link to={paper._id} key={index}>
            <article className="paper__container">
              <h3 className="paper__name">{paper.paper}</h3>
              <hr />
              <p>{paper.year}</p>
              <p>{paper.semester}</p>
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
