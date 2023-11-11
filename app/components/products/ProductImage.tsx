"use client";

import {
  CardProductType,
  selectedImageType,
} from "@/app/product/[product.id]/ProductDetails";
import Image from "next/image";
import React from "react";

interface ProductImageProps {
  cartProduct: CardProductType;
  product: any;
  handleColorSelect: (value: selectedImageType) => void;
}

const ProductImage: React.FC<ProductImageProps> = ({
  cartProduct,
  product,
  handleColorSelect,
}) => {
  return (
    <div
      className="grid
        grid-cols-6 gap-2  
        h-full max-[500px] min-h-[300px] sm:min-h-[400px]"
    >
      <div
        className="flex flex-col items-center 
      justify-center gap-4 cursor-pointer border h-full 
       max-[500px] min-h-[300px] sm:min-h-[400px]
      "
      >
        {product.images.map((image: selectedImageType) => {
          return (
            <div
              className={`relative w-[80%] aspect-square rounded border-teal-400
                ${
                  cartProduct.selectedImage.color === image.color
                    ? "border-[1.4px]"
                    : "border-none"
                }
              `}
              key={image.color}
              onClick={() => handleColorSelect(image)}
            >
              <Image
                src={image.image}
                alt={image.color}
                fill
                className="object-contain h-full"
              />
            </div>
          );
        })}
      </div>
      <div className="col-span-5 relative aspect-square">
        <Image
          src={cartProduct.selectedImage.image}
          alt={cartProduct.selectedImage.color}
          fill
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default ProductImage;
