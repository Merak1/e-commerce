"use client";

interface HorizontalProps {
  length: number;
}
export const Horizontal: React.FC<HorizontalProps> = ({ length }) => {
  let style = `w-[${length}%]`;
  return <hr className={`${style} my-2`} />;
};
