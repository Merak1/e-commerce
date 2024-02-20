import Image from "next/image";
import React from "react";
import { MdTranslate } from "react-icons/md";

interface CategoryProps {
  name: string;
}
const Category: React.FC<CategoryProps> = ({ name }) => {
  return (
    <div className=" mx-3  bg-jrl  flex flex-col h-[250px] rounded-tl-full rounded-tr-full ">
      <div
        className="  w-[60%] pb-[60%] 
       rounded-full  relative"
      >
        <Image
          src="/watame2.jpg"
          alt="benis"
          // width={200}
          // height={200}
          fill
          style={{
            // maxWidth: "100%",
            borderRadius: "9999px",
            position: "absolute",
            top: "65%",
            bottom: "50%",
            transform: "translate(33% , -50%)",
            margin: "0",
          }}
        />
      </div>
      <div
        className=" mx-5 
    
        text-center z-30  flex  justify-center align-middle m-auto "
      >
        <p className="font-semibold  capitalize text-md"> {name}</p>
      </div>
    </div>
  );
};

export default Category;
