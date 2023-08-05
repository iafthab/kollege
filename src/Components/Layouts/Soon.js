import React from "react";
import { BsConeStriped } from "react-icons/bs";
const Soon = () => {
  return (
    <section className="w-full whitespace-break-spaces rounded-md bg-slate-400/50 p-4 text-justify hover:bg-slate-200 dark:bg-slate-600/50 dark:hover:bg-slate-800 lg:w-2/3 ">
      <div className="flex items-center gap-2  text-2xl">
        <BsConeStriped className="text-5xl text-orange-600" />
        <h1 className="inline font-semibold">Under Construction</h1>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga libero
        sunt odio deserunt amet laudantium nam officiis corrupti animi adipisci.
        Ex expedita officiis, nam explicabo iste dolore ab. Fugit harum
        cupiditate rem repudiandae aut dolorum culpa pariatur voluptas
        consectetur maxime ullam possimus atque, iste optio repellendus natus a?
        Aliquid dolore nesciunt. quis dignissimos sint dolorem itaque porro?
      </p>
    </section>
  );
};

export default Soon;
