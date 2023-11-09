"use client";

import { productRating } from "@/utils/productRating";
import { Rating } from "@mui/material";

interface ProductDetailsProps {
  product: any;
}

const Horizontal = () => {
  return <hr className="w-[30%] my-2" />;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const rating = productRating(product);

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-12">
      <div>Images</div>
      <div className="flex flex-col text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name} </h2>
        <div className="flex items-center gap-2">
          <Rating value={rating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal />
        <div className="text-justify">{product.description}</div>
        <Horizontal />
        <div>
          <span className="font-semibold">Category : </span> {product.category}
        </div>
        <div>
          <span className="font-semibold">Brand : </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}{" "}
        </div>
        <Horizontal />
        <div>Color </div>
        <Horizontal />
        <div>quantity </div>
        <Horizontal />
        <div>Add to cart</div>
      </div>
    </div>
  );
};

export default ProductDetails;
