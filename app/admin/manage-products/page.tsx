import Container from "@/app/components/Container";
import ManageProductsClient from "./ManageProductsClient";
import getProducts from "@/actions/getProducts";
import { getCurrentUser } from "@/actions/getCurrentUser";
import getImages from "@/actions/getImages";
import { createContext } from "react";
import getAllImages from "@/actions/getAllImages";

const ManageProducts = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getCurrentUser();
  // const images = await getImages({ category: null });
  const images = await getAllImages();

  // console.log("🔴 images 🔴", images);

  return (
    <div>
      <Container>
        <ManageProductsClient products={products} allDbImages={images} />
      </Container>
    </div>
  );
};

export default ManageProducts;
