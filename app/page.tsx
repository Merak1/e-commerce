// import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/nav/HomeBanner";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/productCard";
import getProducts, { IProductParams } from "@/actions/getProducts";
import React from "react";
import NullData from "./components/NullData";

interface HomeProps {
  searchParams: IProductParams;
}

export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <NullData title="no products found" />;
  }

  return (
    <div className="p-8">
      <Container>
        <HomeBanner />
        <div>
          <div
            className="grid grid-cols-2 sm:grid-cols-3
              lg:grid-cols-4 xl:grid-cols-5 
              2xl:grid-cols-6 gap-8"
          >
            {products.map((product: any) => {
              return (
                <div key={product.id}>
                  <ProductCard data={product} />
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
