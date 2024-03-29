"use client";

import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  disabled?: boolean;
  small?: boolean;
  outline?: boolean;
  icon?: IconType;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
const Button: React.FC<ButtonProps> = ({
  label,
  disabled,
  small,
  outline,
  icon: Icon,
  onClick,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={` 
      disabled: opacity-100 disabled:cursor-not-allowed 
      rounded-2xl hover:opacity-80
      transition w-full text-lg
      flex items-center justify-center gap-2
      ${outline ? "bg-white " : "bg-slate-950"}
      ${outline ? "text-slate-700" : "text-jrl"}
      ${small ? "text-sm font-light" : "text-md font-semibold"}
      ${small ? "py-1 px-2 border-[1px]" : "py-3 px-4 border-2"}

      `}
    >
      {Icon && <Icon size={24} />}
      {label}
    </button>
  );
};

export default Button;
