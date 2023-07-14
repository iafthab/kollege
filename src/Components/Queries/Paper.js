import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../Hooks/UserContext";
import { AiFillBook } from "react-icons/ai";

const Paper = () => {
  const { setNotes, setPaper, paperList } = useContext(UserContext);

  useEffect(() => {
    setNotes([]);
  }, [setNotes]);

  return (
    <main className="paper">
      <h2 className="text-violet-950 dark:text-slate-400 underline-offset-4 text-6xl mt-3 dark:mt-0 mb-2 underline decoration-inherit decoration-2 font-bold">
        Papers
      </h2>
      {paperList.length ? (
        <section className="pt-4">
          {paperList.map((paper, index) => (
            <Link to={paper.paper} key={index} onClick={() => setPaper(paper)}>
              <article className="flex p-4 bg-violet-200 rounded-md border-2 border-slate-900 hover:bg-violet-950 hover:text-slate-100 mb-4 dark:bg-slate-950/5 dark:border-slate-200 dark:hover:bg-slate-950/80 dark:hover:border-slate-200 ">
                <AiFillBook className="text-[4rem]" />
                <div className="">
                  <h3 className="font-semibold text-2xl px-2">{paper.paper}</h3>
                  <hr className="border-[1px]" />
                  <p className="font-medium text-md px-2 ">{paper.year}</p>
                </div>
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
