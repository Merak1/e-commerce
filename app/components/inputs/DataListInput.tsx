import { getUniqueString } from "@/utils/uniqueString";
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
  return (
    <div className="m-x-auto w-full">
      <div className="flex ">
        <input
          type="search"
          defaultValue={label}
          list="list"
          autoComplete="on"
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
              <div key={d.value + getUniqueString(4)}>
                <option key={d.value} value={d.label} />
              </div>
            )
          )}
        </datalist>
      </div>
    </div>
  );
};

export default DataListInput;
