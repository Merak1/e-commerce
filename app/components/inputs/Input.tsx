"use client";

import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  sm?: boolean;
  valueAsNumber?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  type,
  disabled,
  required,
  register,
  errors,
  sm,
  valueAsNumber,
}) => {
  return (
    <div className="w-full relative mt-3">
      <input
        autoComplete="off"
        id={id}
        disabled={disabled}
        type={type}
        required={required}
        placeholder=""
        {...register(id, { required, valueAsNumber })}
        className={`peer w-full 
        ${sm === true ? "p-2 pt-3" : "p-4 pt-6"}
        outline-none bg-white
        font-light border-2 rounded-md transition disabled:opacity-70 
        disabled:cursor-not-allowed 
        ${errors[id] ? "border-rose-400" : "border-slate-300"}
      `}
      />

      <label
        className={`absolute cursor-text text-md
        duration-150 transform 
         ${
           sm === true
             ? "-translate-y-3 top-3 z-5 "
             : "  -translate-y-3 top-4 z-10"
         }
        origin-[0]
        left-4 peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0 
        peer-focus:scale-75 peer-focus:-translate-y-4
        capitalize
         ${errors[id] ? "text-rose-500" : "text-slate-400"}
       `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
