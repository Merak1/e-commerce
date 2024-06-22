import { MdCancel, MdDelete } from "react-icons/md";

interface CurrentImageDeleteProps {
  setToggle: any;
  toggle: boolean;
}

const CurrentImageDelete: React.FC<CurrentImageDeleteProps> = ({
  setToggle,
  toggle,
}) => {
  const handleToggle = () => {
    // console.log("toggle button");
    setToggle(!toggle);
  };
  return (
    <div
      className={`absolute z-30
                  right-[0%] top-[0.5%]
                text-red-800 hover:text-red-600
                  hover:cursor-pointer`}
      onClick={() => handleToggle()}
    >
      {toggle === false ? <MdDelete size={18} /> : <MdCancel size={18} />}
    </div>
  );
};

export default CurrentImageDelete;
