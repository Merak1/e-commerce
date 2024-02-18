import Image from "next/image";
import React, { useState } from "react";
interface ProductImagePreviewProps {
  product: any;
  imageSelected: number;
}
const ProductImagePreview: React.FC<ProductImagePreviewProps> = ({
  product,
  imageSelected,
}) => {
  return (
    <div className="flex  flex-row  w-full">
      <div className="w-20 m-auto ">
        <div className="flex align-middle items-center justify-center">
          {product.images.map((image: any, index: number) => {
            if (index === imageSelected) {
            }
            return (
              <div
                className={`relative w-[40px] aspect-square  border-teal-400
                    ${
                      index === imageSelected
                        ? "border border-jrl rounded-md"
                        : " rounded"
                    }
                  `}
              >
                <Image
                  src={image.image}
                  alt={image.color}
                  fill
                  className="object-contain h-full rounded-md"
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductImagePreview;
