import { Key, SetStateAction, useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
interface DataListInputProps {
  id: string;
  label?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  data: any;
  onClick: (value: string) => void;
  onChange: (value: any) => void;
}

const DataListInput: React.FC<DataListInputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  data,
  onChange,
  onClick,
}) => {
  //   const [text, setText] = useState("");

  //   const onChange = (event: { target: { value: SetStateAction<string> } }) => {
  //     setText(event.target.value);
  //   };

  return (
    <div className="m-x-auto w-full">
      <div className="flex ">
        <input
          placeholder=""
          type="search"
          list="list"
          autoComplete="on"
          value={label}
          onChange={() => onChange(event)}
          className={`peer w-full p-4 pt-6 outline-none bg-white
        font-light border-2 rounded-md transition disabled:opacity-70 
        disabled:cursor-not-allowed 
        ${errors[id] ? "border-rose-400" : "border-slate-300"}
      `}
        />

        <datalist id="list">
          {data.map(
            (d: {
              value: Key | null | undefined;
              label: string | number | readonly string[] | undefined;
            }) => (
              <div key={d.value}>
                <option key={d.value} value={d.label} />
              </div>
            )
          )}
        </datalist>
        <label
          className={`absolute cursor-text text-md
        duration-150 transform 
        -translate-y-3 top-5 z-10 origin-[0]
        left-4 peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-4 capitalize
        ${errors[id] ? "border-rose-400" : "border-slate-300"}

       `}
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    </div>
  );
};

export default DataListInput;
