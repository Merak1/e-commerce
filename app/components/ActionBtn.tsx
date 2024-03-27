import { IconType } from "react-icons";

interface ActionBtnProps {
  icon: IconType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  action?: string;
}

const ActionBtn: React.FC<ActionBtnProps> = ({
  icon: Icon,
  onClick,
  action,
  disabled,
}) => {
  return (
    <div className="flex flex-col border border-solid ">
      <button
        title={action}
        disabled={disabled}
        onClick={onClick}
        className={`flex items-center justify-center
        rounded cursor-pointer w-[40px] h-[30px]
        hover:border-cyan-700 hover:divide-x-0 > * 
        ${action === "delete product" ? "bg-red-500 text-slate-50 " : ""}
        ${action === "see product details" ? "bg-sky-600 text-slate-50 " : ""}
        ${
          action === "edit product details"
            ? "bg-purple-400 text-slate-50 "
            : ""
        }
        text-slate-700 border border-slate-400`}
      >
        <Icon size={18} />
      </button>
      {/* <p className="text-[10px]">{action}</p> */}
    </div>
  );
};

export default ActionBtn;
