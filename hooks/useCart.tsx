import { CartProductType } from "@/app/product/[product.id]/ProductDetails";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_CARTITEMS = "eshopCart";
type CartContextType = {
  cartTotalQuantity: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const cartItemsLS: any = localStorage.getItem(LOCAL_STORAGE_CARTITEMS);

      const cart: CartProductType[] | null = JSON.parse(cartItemsLS);

      setCartProducts(cart);
    }
  }, []);

  useEffect(() => {
    console.log("cartProducts from userCart hook", cartProducts);
  }, [cartProducts]);

  const handleAddProductToCart = useCallback(
    (product: CartProductType) => {
      setCartProducts((prev) => {
        // console.log("prev ", prev);
        let updatedCart;

        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }

        localStorage.setItem(
          LOCAL_STORAGE_CARTITEMS,
          JSON.stringify(updatedCart)
        );

        return updatedCart;
      });
    },
    [cartProducts]
  );

  const value = {
    cartTotalQuantity: 0,
    cartProducts,
    handleAddProductToCart,
  };
  return <CartContext.Provider value={value} {...props} />;
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (context === null) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
