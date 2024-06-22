import { Product } from "@prisma/client";
import AddProductForm from "../add-products/AddProductForm";
import { imagesArray } from "./ManageProductsClient";
import { forwardRef, useCallback, useContext } from "react";
import UpdateProductForm from "./UpdateProductForm";

interface UpdateProductProps {
  formValues: any;
}
const UpdateProduct: React.FC<UpdateProductProps> = ({ formValues }) => {
  const {
    name,
    description,
    price,
    brand,
    category,
    inStock,
    images,
    sku,
    model,
  } = formValues;
  // console.log("name : 😢 " + name);
  // console.log("description : 😢 " + description);
  // console.log("price : 😢 " + price);
  // console.log("brand : 😢 " + brand);
  // console.log("category : 😢 " + category);
  // console.log("inStock : 😢 " + inStock);
  // console.log("images : 😢 " + images[0]);
  // console.log("images : 😢 " + images);
  // console.log(images[0]);
  // console.log("sku : 😢 " + sku);
  // console.log("model : 😢 " + model);

  const data = {
    name: name,
    description: description,
    price: price.match(/\d+/)[0],
    brand: brand,
    category: category,
    inStock: inStock,
    images: [...images],
    sku: sku,
    model: model,
  };

  return <UpdateProductForm formValues={data} />;
};

export default UpdateProduct;
