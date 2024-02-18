"use client";

import Image from "next/image";
import { truncateText } from "@/utils/truncateText";
import { formatPrice } from "@/utils/formatPrice";
// import { Rating } from "@mui/material";
import { useRouter } from "next/navigation";
import Button from "../Button";
import { useCart } from "@/hooks/useCart";
import { useState } from "react";
import { selectedImageType } from "@/app/product/[product.id]/ProductDetails";
import ProductImagePreview from "./ProductImagePreview";

interface ProductCardProps {
  product: any;
}
export type CartProductType = {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: number;
  selectedImage: selectedImageType;
  quantity: number;
  price: number;
};
const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    brand,
    category,
    description,
    id,
    inStock,
    model,
    name,
    price,
    sku,
    images,
  } = product;
  const imagesAmount = images.length;
  const router = useRouter();
  const { handleAddProductToCart } = useCart();
  const [imageSelected, setImageSelected] = useState(0);

  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: id,
    name: name,
    description: description,
    category: category,
    brand: brand,
    selectedImage: { ...images[0] },
    quantity: 1,
    price: price,
  });

  const handlePreviousImageSelected = () => {
    if (imageSelected !== 0) {
      setImageSelected(imageSelected - 1);
    }
    if (imageSelected === 0) {
      setImageSelected(imagesAmount - 1);
    }
  };
  const handleNextImageSelected = () => {
    if (imageSelected !== imagesAmount) {
      setImageSelected(imageSelected + 1);
    }
    if (imageSelected === imagesAmount - 1) {
      setImageSelected(0);
    }
  };

  if (!product) {
    return <div className="">No product</div>;
  }
  return (
    <div className="col-span-1 border-slate-200 bg-slate-50 rounder-sm p-2 transition hover:scale-105 text-center text-sm border-[1.2px]">
      <div className="flex flex-col items-center">
        <div
          onClick={() => router.push(`/product/${id}`)}
          className="aspect-square  cursor-pointer  overflow-hidden 
          relative w-full  "
        >
          <Image
            fill
            src={images[imageSelected].image}
            alt={name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className=" border-y-[1px]  border-slate-400 w-full pt-2 pb-2 flex">
          <div className=" m-auto">
            <button
              onClick={() => handlePreviousImageSelected()}
              className="rounded-lg border p-[2.3px]  border-slate-900"
            >
              &lt;&lt;
            </button>
          </div>
          <ProductImagePreview
            imageSelected={imageSelected}
            product={product}
          />
          <div className=" m-auto">
            <button
              onClick={() => handleNextImageSelected()}
              className="rounded-lg border p-[2.3px] border-slate-900  "
            >
              &gt;&gt;
            </button>
          </div>
        </div>
        <div className="font-semibold text-xl">{formatPrice(price)}</div>
        <div className="mt-1">
          <p className="text-lg "> {truncateText(name)} </p>
        </div>
        {/* <div>
          <Rating value={rating} readOnly />
        </div>
        <div>{reviews.length} reviews</div> */}
      </div>
      <div className="mt-2">
        <Button
          label="Agregar"
          onClick={() => {
            handleAddProductToCart(cartProduct);
          }}
        />
      </div>
    </div>
  );
};

export default ProductCard;
