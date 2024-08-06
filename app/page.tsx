import Container from "./components/Container";
import HomeBanner from "./components/home/HomeBanner";
import ProductCard from "./components/products/productCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import React from "react";
import NullData from "./components/NullData";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import toast from "react-hot-toast";
import Test from "./components/test";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  console.log("products 🔴", products);
  if (products.length === 0) {
    return <NullData title="no products found" />;
  }

  return (
    <div className="p-5 pt-3">
      <Container>
        <HomeBanner />
        <div>
          {/* <Test /> */}
          <div
            className="grid grid-cols-2 sm:grid-cols-3
              lg:grid-cols-4 xl:grid-cols-5 
              2xl:grid-cols-6 gap-5"
          >
            {products.map((product: any) => {
              return (
                <div key={product.id}>
                  <ProductCard product={product} />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
