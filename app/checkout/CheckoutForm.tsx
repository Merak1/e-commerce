"use client";

import { useCart } from "@/hooks/useCart";
import { formatPrice } from "@/utils/formatPrice";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Heading from "../components/Heading";
import Button from "../components/Button";

interface CheckoutFormProps {
  clientSecret: string;
  handleSetPaymentSuccess: (value: boolean) => void;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({
  clientSecret,
  handleSetPaymentSuccess,
}) => {
  const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } =
    useCart();
  const elements = useElements();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }
    if (!clientSecret) {
      return;
    }

    handleSetPaymentSuccess(false);
  }, [stripe]);

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    stripe
      .confirmPayment({
        elements,
        redirect: "if_required",
      })
      .then((result) => {
        if (!result.error) {
          toast.success("Checkout completed successfully");

          handleClearCart();
          handleSetPaymentSuccess(true);
          handleSetPaymentIntent(null);
        }
        setIsLoading(false);
      });
  };
  return (
    <div className="">
      <form onSubmit={handleSubmitForm} id="payment-form">
        <div className="mb-6">
          <Heading title="Enter your details to complete checkout" />
        </div>
        <h2 className="font-semibold mt-4 mb-2">Addres Information</h2>
        <AddressElement
          id="address-element"
          options={{ mode: "shipping", allowedCountries: ["MX"] }}
        />
        <h2 className="font-semibold mt-4 mb-2">Payment Information</h2>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
        <div className="py-4 text-center text-slate-700 text-xl font-bold">
          Total: {formatPrice(cartTotalAmount)}
        </div>
        <Button
          label={isLoading ? "Processing" : "Pay now"}
          disabled={isLoading || !stripe || !elements}
          onClick={() => {}} // this submits the form by default
        />
      </form>
    </div>
  );
};

export default CheckoutForm;
