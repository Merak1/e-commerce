import Container from "@/app/components/Container";
import ProductDetails from "./ProductDetails";
// import ListRating from "../ListRating";
import getProductsById from "@/actions/getProductById";

interface Iprams {
  productId?: any;
}
const Product = async ({ params }: { params: Iprams }) => {
  let productId = Object.values(params)[0];
  const product = await getProductsById(productId);

  if (product) {
    return (
      <div>
        <Container>
          <ProductDetails product={product} />
          <div className="flex flex-col mt-20 gap-4 ">
            {/* <div>Add rating</div>
            <ListRating product={product} /> */}
          </div>
        </Container>
      </div>
    );
  }
  // todo handle exception when no product, which this never happens
  return <div>No products</div>;
};

export default Product;
