"use client";

import React from "react";
import { CartProductType } from "../product/[product.id]/ProductDetails";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncateText";
import Link from "next/link";
import Button from "../components/Button";
import Image from "next/image";
import SetQuantity from "../components/products/SetQuantity";

interface ItemContentProps {
  item: CartProductType;
}
const ItemContent: React.FC<ItemContentProps> = ({ item }) => {
  console.log("item", item);
  return (
    <div
      className="grid grid-cols-5
        text-xs md:text-sm
        gap-4 border-t-[1.5px]
       border-slate-200 py-4 items-center"
    >
      {/* <div>{truncateText(item.name)}</div>
      <div>{formatPrice(item.price)}</div> */}
      <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
        <Link href={`/products/${item.id}`}>
          <div className="relative w-[70px] aspect-square">
            <Image
              src={item.selectedImage.image}
              alt={item.name}
              fill
              className="object-contian"
            />
          </div>
        </Link>
        <div className="flex flex-col justify-between">
          <Link href={`/products/${item.id}`}>
            {truncateText(item.name)}
            <div>{item.selectedImage.color}</div>
            <div className="w-[70px]">
              <button className="text-slate-500 underline" onClick={() => {}}>
                Remove
              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="justify-self-center">{formatPrice(item.price)}</div>
      <div className="justify-self-center">
        <SetQuantity
          cartCounter
          cartProduct={item}
          handleQtyDecrease={() => {}} // TODO
          handleQtyIncrease={() => {}} // TODO
        />
      </div>
      <div className="justify-self-center">
        {formatPrice(item.price * item.quantity)}
      </div>
    </div>
  );
};

export default ItemContent;
