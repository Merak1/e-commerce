"use client";
import { ImageType } from "@/app/admin/add-products/AddProductForm";
import React, { useCallback, useEffect, useState } from "react";
import SelectImage from "./SelectImage";
import Button from "../Button";

interface ColorSelectorProps {
  item: ImageType;
  addImageToState: (value: ImageType) => void;
  removeImageFromState: (value: ImageType) => void;
  isProductCreated: boolean;
}
const ColorSelector: React.FC<ColorSelectorProps> = ({
  item,
  addImageToState,
  removeImageFromState,
  isProductCreated,
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const customColor = item.colorCode;
  useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = useCallback((value: File) => {
    setFile(value);
    addImageToState({ ...item, image: value });
  }, []);
  const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsSelected(e.target.checked);

    if (!e.target.checked) {
      setFile(null);
      removeImageFromState(item);
    }
  }, []);
  return (
    <div
      className="grid grid-cols-1  overflow-y-auto  border-b-[1.2px] 
                            border-slate-200 items-center p-2
  "
    >
      <div className="flex flex-row gap-2 items-center h-[60px]">
        <div
          className={` w-1/8 h-[20px] p-5`}
          style={{ backgroundColor: customColor }}
        ></div>
        <input
          type="checkbox"
          id={item.color}
          checked={isSelected}
          onChange={handleCheck}
          className="cursor-pointer"
        />
        <label htmlFor={item.color} className="font-medium cursor-pointer">
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className="col-span-2 text-center">
            <SelectImage item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className="flex flex-row gap-2 text-sm col-span-2 items-center">
            <p>{file?.name}</p>
            <div className="w-70px">
              <Button
                label="Cancel"
                onClick={() => {
                  setFile(null);
                  removeImageFromState(item);
                }}
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default ColorSelector;
