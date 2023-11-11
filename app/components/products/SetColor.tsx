"use client";

import {
  CardProductType,
  selectedImageType,
} from "@/app/product/[product.id]/ProductDetails";
import { dividerClasses } from "@mui/material";

interface SetColorProps {
  images: selectedImageType[];
  cartProduct: CardProductType;
  handleColorSelect: (value: selectedImageType) => void;
}

const SetColor: React.FC<SetColorProps> = ({
  images,
  cartProduct,
  handleColorSelect,
}) => {
  return (
    <div>
      <div className="flex gap-4 items-center">
        <span className="font-semibold">Color: </span>
        <div className="flex gap-1">
          {images.map((image) => {
            return (
              <div
                onClick={() => handleColorSelect(image)}
                key={image.color}
                className={`
              h-7
              w-7
              rounded-full
              border-teal-300
              flex items-center justify-center
              ${
                cartProduct.selectedImage.color === image.color
                  ? "border-[1.5px]"
                  : "border-none"
              }`}
              >
                <div
                  className="h-5 w-5 rounded-full border-slate-300 cursor-pointer"
                  style={{ background: image.colorCode }}
                >
                  {" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetColor;
