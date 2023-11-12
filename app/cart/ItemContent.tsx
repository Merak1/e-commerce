"use client";

import React from "react";
import { CartProductType } from "../product/[product.id]/ProductDetails";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  const {
    handleRemoveProductFromCart,
    handleCartQuantityDecrease,
    handleCartQuantityIncrease,
  } = useCart();

  return (
    <div
      className="grid grid-cols-5
        text-xs md:text-sm
        gap-4 border-t-[1.5px]
       border-slate-200 py-4 items-center"
    >
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/product/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImage.image}
              alt={item.name}
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link className="" href={`/product/${item.id}`}>
            {truncateText(item.name)}
          </Link>
          <div>{item.selectedImage.color}</div>
          <div className="w-[70px]">
            <button
              className="text-slate-500 underline hover:text-slate-800"
              onClick={() => handleRemoveProductFromCart(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyDecrease={() => {
            handleCartQuantityDecrease(item);
          }}
          handleQtyIncrease={() => {
            handleCartQuantityIncrease(item);
          }}
        />
      </div>
      <div className="justify-self-center">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
