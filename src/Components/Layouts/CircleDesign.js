import React from "react";

const CircleDesign = () => {
  return (
    <div
      className="animate-pulseSlow absolute -z-[1] flex  h-full w-full flex-col items-center justify-center gap-16 blur-2xl xl:flex-row"
      name="blur design"
    >
      <span className=" inline-block h-[16rem] w-[10rem] rounded-r-full bg-violet-900"></span>
      <span className=" inline-block h-[16rem] w-[18rem] rounded-full bg-violet-900"></span>
      <span className=" inline-block h-[16rem] w-[18rem] rounded-full bg-violet-900"></span>
      <span className=" inline-block h-[16rem] w-[18rem] rounded-full bg-violet-900"></span>
      <span className=" inline-block h-[16rem] w-[10rem] rounded-l-full bg-violet-900"></span>
    </div>
  );
};

export default CircleDesign;
