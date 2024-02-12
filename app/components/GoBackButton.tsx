"use client";
import { useRouter } from "next/navigation";
import { MdArrowBack, MdOutlineArrowBack } from "react-icons/md";

const GoBackButton = () => {
  const router = useRouter();

  return (
    <button
      className="
        opacity-100  
      rounded-md hover:opacity-80
      transition w-full 
      border-slate-700
      flex items-center justify-end gap-2"
      onClick={() => {
        router.back();
      }}
    >
      Go back
    </button>
  );
};

export default GoBackButton;
