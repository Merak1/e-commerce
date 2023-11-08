import { products } from "@/utils/products";
import Container from "./components/Container";
import HomeBanner from "./components/nav/HomeBanner";
import { truncateText } from "@/utils/truncateText";
import ProductCard from "./components/products/productCard";

export default function Home() {
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
                // <div key={product.id}>
                //   <h1 className="text-2xl font-bold mb-4">
                //     {truncateText(product.name)}
                //   </h1>
                //   <p className="mb-4">{product.description}</p>
                //   <p className="mb-4">{product.price}</p>
                // </div>
                <ProductCard data={product} />
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
