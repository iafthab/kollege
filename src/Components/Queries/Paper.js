import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";

const Paper = () => {
  const { setPaper, paperList } = useContext(UserContext);

  return (
    <main className="paper">
      <h2>Papers</h2>
      {paperList.length ? (
        <section className="paper__body">
          {paperList.map((paper, index) => (
            <Link to={paper.paper} key={index} onClick={() => setPaper(paper)}>
              <article className="paper__container">
                <h3 className="paper__name">{paper.paper}</h3>
                <hr />
                <p>{paper.year}</p>
              </article>
            </Link>
          ))}
        </section>
      ) : (
        <p>No Papers Found</p>
      )}
    </main>
  );
};

export default Paper;
