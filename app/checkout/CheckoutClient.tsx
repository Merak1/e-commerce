"use client";
import { useCart } from "@/hooks/useCart";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import React, { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";
import axios from "axios";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);
interface CheckoutClientProps {
  currentUserEmail: any;
}
const CheckoutClient: React.FC<CheckoutClientProps> = ({
  currentUserEmail,
}) => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent, shippingPrice } =
    useCart();
  const [loading, setLoading] = useState<true | false>(false);
  const [error, setError] = useState<true | false>(false);
  const [payment_intent_id, setPayment_intent_id] = useState<any>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [shippingDetailsExist, setShippingDetailsExist] =
    useState<boolean>(false);

  const [packagesDetails, setPackagesDetails] = useState<any>({
    success: false,
    order_id: 0,
    courier: "",
    data: {
      success: null,
      trackingNumber: "",
      labelsNumber: 0,
      amount: 0,
      orderId: 0,
      dataArray: [],
    },
  });

  useEffect(() => {
    console.log("packagesDetails from checkout client 🏂🏂🏂");
    console.log(packagesDetails);
  }, [packagesDetails]);

  const router = useRouter();

  useEffect(() => {
    // create a payment intent as soon as the page loads

    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          shipping: shippingPrice,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          if (res.status !== 200) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          //get client secret
          setClientSecret(data.paymentIntent.client_secret);
          // update payment intent to localstorage
          handleSetPaymentIntent(data.paymentIntent.id);
        })
        .catch((err) => {
          setError(true);
          toast.error(err);
        });
    }
  }, [cartProducts, paymentIntent]);

  useEffect(() => {
    // update  a order with the shipping data

    if (packagesDetails.success === true) {
      console.log("packagesDetails.success ", packagesDetails.success);
      setLoading(true);
      setError(false);

      fetch("/api/update-order-shipping", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packagesDetails: packagesDetails,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            return router.push("/login");
          }
          if (res.status !== 200) {
            return router.push("/login");
          }

          return res.json();
        })
        .then((data) => {
          // console.log("/api/update-order-shipping", data);
        })
        .catch((err) => {
          setError(true);
          toast.error(err);
        });
    }
  }, [packagesDetails]);

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      labels: "floating",
    },
  };
  const handleSetPaymentSuccess = useCallback((value: boolean) => {
    setPaymentSuccess(value);
  }, []);
  return (
    <>
      <div className="w-full">
        {clientSecret && cartProducts && (
          <Elements options={options} stripe={stripePromise}>
            <CheckoutForm
              currentUserEmail={currentUserEmail}
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
              setPackagesDetails={setPackagesDetails}
              packagesDetails={packagesDetails}
              loading={loading}
              shippingDetailsExist={shippingDetailsExist}
              setShippingDetailsExist={setShippingDetailsExist}
            />
          </Elements>
        )}
        {loading && <div className="text-center">Loading Checkout...</div>}
        {error && (
          <div className="text-center text-rose-700">Something went wrong </div>
        )}
        {paymentSuccess && (
          <div className="  flex text-center flex-col gap-4">
            <div className="text-teal-300 text-center ">Payment Success</div>
            <div className="max-w-[220px] w-full ">
              <Button
                label="View your Orders"
                onClick={() => router.push("/orders")}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutClient;
