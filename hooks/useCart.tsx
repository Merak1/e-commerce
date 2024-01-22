import { CartProductType } from "@/app/product/[product.id]/ProductDetails";
import { maxItemsQuantity, minItemsQuantity } from "@/utils/constants";
import { rountToTwoDecimals } from "@/utils/roundToTwoDecimals";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-hot-toast";

export const LOCAL_STORAGE_CARTITEMS = "eshopCart";
type CartContextType = {
  cartTotalQuantity: number;
  cartTotalAmount: number;
  cartProducts: CartProductType[] | null;
  handleAddProductToCart: (product: CartProductType) => void;
  handleRemoveProductFromCart: (product: CartProductType) => void;
  handleCartQuantityIncrease: (product: CartProductType) => void;
  handleCartQuantityDecrease: (product: CartProductType) => void;
  handleClearCart: () => void;
  paymentIntent: string | null;
  handleSetPaymentIntent: (val: string | null) => void;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [cartProducts, setCartProducts] = useState<CartProductType[] | null>(
    null
  );

  const [paymentIntent, setPaymentIntent] = useState<string | null>(null);

  // useEffect(() => {
  //   console.log("cartTotalQuantity 1️⃣ ", cartTotalQuantity);
  //   console.log("cartTotalAmount 2️⃣", cartTotalAmount);
  // }, [cartTotalQuantity, cartTotalAmount]);

  //TODO Debounce this functionality
  useEffect(() => {
    if (cartProducts) {
      let totalProductQuantities = 0;
      let totalPriceOfOrder = 0;
      cartProducts?.forEach((element) => {
        const { quantity, price } = element;
        const priceByQuantities = quantity * price;
        totalProductQuantities += quantity;
        totalPriceOfOrder += priceByQuantities;
      });

      let formatedPrice = rountToTwoDecimals(totalPriceOfOrder);

      console.log("totalPriceOfOrder 😃", totalPriceOfOrder);
      console.log("totalPriceOfOrder 😃 type😃 ", typeof totalPriceOfOrder);
      console.log("formatedPrice 💜", formatedPrice);
      console.log("formatedPrice 💜typeof💜", typeof formatedPrice);
      setCartTotalQuantity(totalProductQuantities);
      setCartTotalAmount(formatedPrice);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const cartItemsLS: any = localStorage.getItem(LOCAL_STORAGE_CARTITEMS);

      const cart: CartProductType[] | null = JSON.parse(cartItemsLS);

      const eShopPaymentIntent: any =
        localStorage.getItem("eShopPaymentIntent");

      const paymentIntent: any = JSON.parse(eShopPaymentIntent);
      if (eShopPaymentIntent) {
        console.log("🟣  eShopPaymentIntent exist 🟣 ");
        console.log("🟣 paymentIntent 🟣 ", paymentIntent);
        setPaymentIntent(paymentIntent);
      }

      setCartProducts(cart);
    }
  }, []);

  const handleAddProductToCart = useCallback(
    (product: CartProductType) => {
      setCartProducts((prev) => {
        let updatedCart;

        if (prev) {
          updatedCart = [...prev, product];
        } else {
          updatedCart = [product];
        }
        toast.success("Product added to cart", {
          id: "Product added to cart",
        });
        localStorage.setItem(
          LOCAL_STORAGE_CARTITEMS,
          JSON.stringify(updatedCart)
        );
        return updatedCart;
      });
    },
    [cartProducts]
  );

  const handleRemoveProductFromCart = useCallback(
    (product: CartProductType) => {
      if (cartProducts) {
        const filteredProducts = cartProducts.filter((item) => {
          return item.id !== product.id;
        });
        setCartProducts(filteredProducts);

        toast.success("Product removed from cart", {
          id: "Product removed from cart",
        });
        localStorage.setItem(
          LOCAL_STORAGE_CARTITEMS,
          JSON.stringify(filteredProducts)
        );
      }
    },
    [cartProducts]
  );

  const handleCartQuantityIncrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === maxItemsQuantity) {
        return toast.error("too many items", { id: "too many items" });
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          // product exist in cart
          updatedCart[existingIndex].quantity =
            updatedCart[existingIndex].quantity + 1;
        }
        localStorage.setItem(
          LOCAL_STORAGE_CARTITEMS,
          JSON.stringify(updatedCart)
        );
        setCartProducts(updatedCart);
      }
    },
    [cartProducts]
  );

  const handleCartQuantityDecrease = useCallback(
    (product: CartProductType) => {
      let updatedCart;
      if (product.quantity === minItemsQuantity) {
        return toast.error("You 1 items", { id: "too many items" });
      }

      if (cartProducts) {
        updatedCart = [...cartProducts];

        const existingIndex = cartProducts.findIndex(
          (item) => item.id === product.id
        );

        if (existingIndex > -1) {
          // product exist in cart
          updatedCart[existingIndex].quantity =
            updatedCart[existingIndex].quantity - 1;
        }
        localStorage.setItem(
          LOCAL_STORAGE_CARTITEMS,
          JSON.stringify(updatedCart)
        );
        setCartProducts(updatedCart);
      }
    },
    [cartProducts]
  );

  const handleClearCart = useCallback(() => {
    setCartTotalQuantity(0);
    setCartProducts(null);

    localStorage.setItem(LOCAL_STORAGE_CARTITEMS, JSON.stringify(null));
  }, [cartProducts]);

  const handleSetPaymentIntent = useCallback(
    (val: string | null) => {
      setPaymentIntent(val);
      localStorage.setItem("eShopPaymentIntent", JSON.stringify(val));
    },
    [setPaymentIntent]
  );

  const value = {
    cartTotalQuantity,
    cartTotalAmount,
    cartProducts,
    handleAddProductToCart,
    handleRemoveProductFromCart,
    handleCartQuantityIncrease,
    handleCartQuantityDecrease,
    handleClearCart,
    paymentIntent,
    handleSetPaymentIntent,
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
