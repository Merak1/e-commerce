import Image from "next/image";
import React from "react";

interface CategoryProps {
  name: string;
}
const Category: React.FC<CategoryProps> = ({ name }) => {
  return (
    <div className=" mx-3  bg-jrl  flex flex-col h-[250px] rounded-tl-full rounded-tr-full ">
      <div className=" m-5 h-3/5 rounded-full bg-white">
        <Image
          src="/watame2.jpg"
          alt="benis"
          width={200}
          height={200}
          style={{ maxWidth: "100%", height: "auto", borderRadius: "9999px" }}
        />
      </div>
      <div className=" mx-5 h-2/5 text-center z-30  ">
        <p className="font-semibold capitalize text-lg"> {name}</p>
      </div>
    </div>
  );
};

export default Category;
