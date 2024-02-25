import { IconType } from "react-icons";

interface StatusProps {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}
const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div className=" flex flex-col h-full mt-auto justify-center ">
      <div
        className={` ${bg} ${color} h-[25px]  px-1 rounded flex items-center gap-1 w-fit`}
      >
        {text} <Icon size={15} />
      </div>
    </div>
  );
};

export default Status;
