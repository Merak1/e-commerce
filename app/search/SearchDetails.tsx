import ProductCard from "../components/products/productCard";

const SearchDetails = (products: any) => {
  const filteredProducts = products.products;

  return (
    <div
      className="grid grid-cols-2 sm:grid-cols-3
              lg:grid-cols-4 xl:grid-cols-5 
              2xl:grid-cols-6 gap-5"
    >
      {filteredProducts?.map((product: any) => {
        return (
          <div key={product.id}>
            <ProductCard product={product} />
          </div>
        );
      })}
    </div>
  );
};

export default SearchDetails;
