import { createContext, useContext, useState } from "react";

type CartContextType = {
  cartTotalQuantity: number;
};

export const CartContext = createContext<CartContextType | null>(null);

interface Props {
  [propName: string]: any;
}
export const CartContextProvider = (props: Props) => {
  const [cartTotalQuantity, setCartTotalQuantity] = useState(0);

  const value = {
    cartTotalQuantity: 0,
  };
  return <CartContext.Provider value={value} />;
};

export const useCart = (props: Props) => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within a CartContextProvider");
  }

  return context;
};
