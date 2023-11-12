"use client";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import Heading from "../components/Heading";
import { Horizontal } from "../components/Horizontal";
import SetQuantity from "../components/products/SetQuantity";
import Button from "../components/Button";
import ItemContent from "./ItemContent";

const CartClient = () => {
  const { cartProducts } = useCart();

  if (!cartProducts || cartProducts.length === 0) {
    return (
      <div className="flex flex-col items-center">
        <h1 className="text-2xl">Cart is empty</h1>
        <div>
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span> Start Shopping</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading title="Shopping Cart" center />
      <div className="grid grid-cols-5 uppercase text-xs gap-4 pb-2 items-center mt-8">
        <div className="col-span-2 justify-self-start">product</div>
        <div className="justify-self-center uppercase">price</div>
        <div className="justify-self-center uppercase">quantity</div>
        <div className="justify-self-center uppercase">total</div>
      </div>
      <Horizontal length={100} />
      <div>
        {cartProducts &&
          cartProducts.map((item) => {
            return (
              // everything beyond the return is an aproximation, not final product
              // <div className="grid grid-cols-5 uppercase text-xs gap-4 pb-2 items-center mt-8">
              //   <div className="col-span-2 justify-self-start">
              //     <Link href={`/product/${item.id}`}>
              //       <p className="text-slate-500">{item.name}</p>
              //     </Link>
              //   </div>
              //   <div className="justify-self-end">{item.price}</div>
              //   {/* <SetQuantity
              //     cartProduct={item}
              //     handleQtyIncrease={handleQtyIncrease}
              //     handleQtyDecrease={handleQtyDecrease}
              //   /> */}

              //   <div className="justify-self-end">{item.quantity}</div>
              //   <div className="justify-self-end">
              //     {item.price * item.quantity}
              //   </div>
              // </div>
              <ItemContent key={item.id} item={item} />
            );
          })}
      </div>

      <div
        className="border-t-[1.5px] border-slate-200 py-4
        flex justify-between
      "
      >
        <div className="w-[90px]">
          <Button label="Clear cart" onClick={() => {}} small outline />
        </div>
        <div className="text-sm flex flex-col gap-1 items-start">
          <div className="flex justify-between text-base font-semibold w-full">
            <span>Subtotal</span>
            <span> 1000 $ fake total </span>
          </div>
          <p className="text-slate-500">
            Taxes and shipping calculate at checkout
          </p>
          <Button label="Checkout" onClick={() => {}} />
          <Link
            href={"/"}
            className="text-slate-500 flex items-center gap-1 mt-2"
          >
            <MdArrowBack />
            <span> Continue Shopping</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartClient;
