"use client";

import SetColor from "@/app/components/products/SetColor";
import { productRating } from "@/utils/productRating";
import { Rating } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SetQuantity from "@/app/components/products/SetQuantity";
import Button from "@/app/components/Button";
import ProductImage from "@/app/components/products/ProductImage";
import { Horizontal } from "@/app/components/Horizontal";
import { LOCAL_STORAGE_CARTITEMS, useCart } from "@/hooks/useCart";
import { MdCheckCircle } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ProductDetailsProps {
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

export type selectedImageType = {
  color: string;
  colorCode: string;
  image: string;
};

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const router = useRouter();
  const { cartTotalQuantity, cartProducts, handleAddProductToCart } = useCart();
  const [isProductInCart, setProductInCart] = useState(false);
  const rating = productRating(product);
  const [cartProduct, setCartProduct] = useState<CartProductType>({
    id: product.id,
    name: product.name,
    description: product.description,
    category: product.category,
    brand: product.brand,
    selectedImage: { ...product.images[0] },
    quantity: 1,
    price: product.price,
  });
  const handleColorSelect = useCallback(
    (value: selectedImageType) => {
      setCartProduct((prev) => {
        return {
          ...prev,
          selectedImage: value,
        };
      });
    },
    [cartProduct.selectedImage]
  );
  const handleQtyDecrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity === 1) return prev;
      return {
        ...prev,
        quantity: prev.quantity - 1,
      };
    });
  }, [cartProduct.quantity]);
  const handleQtyIncrease = useCallback(() => {
    setCartProduct((prev) => {
      if (prev.quantity === 9) return prev;
      return {
        ...prev,
        quantity: prev.quantity + 1,
      };
    });
  }, []);

  useEffect(() => {
    // console.log("cartProducts 🟠 ", cartProducts);
    // console.log("product 🟢 ", product);
    setProductInCart(false);
    if (cartProducts && product) {
      const existingIndex = cartProducts.findIndex(
        (item) => item.id === product.id
      ); // returns -1 if not found

      if (existingIndex > -1) {
        setProductInCart(true);
      }
    }
  }, [cartProducts]);

  return (
    <div className="grid grid-cols-1  md:grid-cols-2 gap-12 mt-6">
      <ProductImage
        cartProduct={cartProduct}
        product={product}
        handleColorSelect={handleColorSelect}
      />
      <div className="flex flex-col text-slate-500 text-sm">
        <h2 className="text-3xl font-medium text-slate-700">{product.name} </h2>
        <div className="flex items-center gap-2">
          <Rating value={rating} readOnly />
          <div>{product.reviews.length} reviews</div>
        </div>
        <Horizontal length={30} />
        <div className="text-justify">{product.description}</div>
        <Horizontal length={30} />
        <div>
          <span className="font-semibold">Category : </span> {product.category}
        </div>
        <div>
          <span className="font-semibold">Brand : </span> {product.brand}
        </div>
        <div className={product.inStock ? "text-teal-400" : "text-rose-400"}>
          {product.inStock ? "In stock" : "Out of stock"}{" "}
        </div>
        <Horizontal length={30} />

        {isProductInCart ? (
          <>
            <p className="mb-2 text-slate-500 flex items-center gap-1">
              <MdCheckCircle size={20} className="text-teal-200" />
              <span>Product added to cart</span>
            </p>

            <div className="max-w-[300px]">
              <Button
                label="view cart"
                outline
                onClick={() => {
                  router.push("/cart");
                }}
              />
            </div>
          </>
        ) : (
          <>
            <SetColor
              images={product.images}
              cartProduct={cartProduct}
              handleColorSelect={handleColorSelect}
            />
            <Horizontal length={30} />
            <SetQuantity
              cartProduct={cartProduct}
              handleQtyIncrease={handleQtyIncrease}
              handleQtyDecrease={handleQtyDecrease}
            />
            <Horizontal length={30} />
            <div className="max-w-[300px]">
              <Button
                label="Add to cart"
                onClick={() => {
                  handleAddProductToCart(cartProduct);
                }}
              />
            </div>
          </>
        )}
        {/* <SetColor
          images={product.images}
          cartProduct={cartProduct}
          handleColorSelect={handleColorSelect}
        />
        <Horizontal length={30} />
        <SetQuantity
          cartProduct={cartProduct}
          handleQtyIncrease={handleQtyIncrease}
          handleQtyDecrease={handleQtyDecrease}
        />
        <Horizontal length={30} />
        <div className="max-w-[300px]">
          <Button
            label="Add to cart"
            onClick={() => {
              handleAddProductToCart(cartProduct);
            }}
          />
        </div> */}
      </div>
    </div>
  );
};

export default ProductDetails;
