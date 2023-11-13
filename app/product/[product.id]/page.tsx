"use client";
import Container from "@/app/components/Container";
// import { product } from "@/utils/product";
import { products } from "@/utils/products";
import ProductDetails from "./ProductDetails";
import ListRating from "../ListRating";
import { useEffect, useState } from "react";

interface Iprams {
  productId?: any;
}
const Product = ({ params }: { params: Iprams }) => {
  const [product, setProduct] = useState<any>(null);

  let productId = Object.values(params)[0];

  useEffect(() => {
    setProduct(products.find((item: any) => item.id === productId));
  }, [product]);

  if (product) {
    return (
      <div>
        {}
        <Container>
          <ProductDetails product={product} />
          <div className="flex flex-col mt-20 gap-4 ">
            <div>Add rating</div>
            <ListRating product={product} />
          </div>
        </Container>
      </div>
    );
  }
};

export default Product;
