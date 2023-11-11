"use client";

export const Horizontal = ({ length }) => {
  console.log(length);
  return <hr className={`w-[${length}%] my-2  `} />;
};
