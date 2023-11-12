"use client";

import { CartProductType } from "@/app/product/[product.id]/ProductDetails";
import React from "react";

interface SetQuantityProps {
  cartCounter?: boolean;
  cartProduct: CartProductType;
  handleQtyIncrease: () => void;
  handleQtyDecrease: () => void;
}

const btnStyles = "border-[1.2px] border-state-300 px-2 rounded";
const SetQuantity: React.FC<SetQuantityProps> = ({
  cartCounter,
  cartProduct,
  handleQtyDecrease,
  handleQtyIncrease,
}) => {
  return (
    <div className="flex gap-7 items-center">
      {cartCounter ? null : <div className="font-semibold">Quantity:</div>}
      <div className="flex gap-4 items-center text-base">
        <button className={btnStyles} onClick={handleQtyDecrease}>
          -
        </button>
        <div>{cartProduct.quantity}</div>
        <button className={btnStyles} onClick={handleQtyIncrease}>
          +
        </button>
      </div>
    </div>
  );
};

export default SetQuantity;
