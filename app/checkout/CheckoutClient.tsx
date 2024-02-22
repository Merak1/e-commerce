"use client";
import { useCart } from "@/hooks/useCart";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { StripeElementsOptions, loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import Button from "../components/Button";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutClient = () => {
  const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart();
  const [loading, setLoading] = useState<true | false>(false);
  const [error, setError] = useState<true | false>(false);
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    // create a payment intent as soon as the page loads

    console.log("payment intent  ", paymentIntent);
    console.log("clientSecret", clientSecret);
    console.log("cartProducts", cartProducts);

    if (cartProducts) {
      setLoading(true);
      setError(false);

      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cartProducts,
          payment_intent_id: paymentIntent,
        }),
      })
        .then((res) => {
          setLoading(false);
          if (res.status === 401) {
            // toast.error("💜🧡res status 401 💜🧡 request lacks authentication");
            return router.push("/login");
          }
          if (res.status !== 200) {
            // toast.error("res status 💜🧡💜 = " + res.status);
            return router.push("/login");
          }

          // console.log("res.status 💜", res.status);

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
    // console.log("paymentIntent 💜💙", paymentIntent);
    // console.log("cartProducts 💜", cartProducts);
  }, [cartProducts, paymentIntent]);

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
              clientSecret={clientSecret}
              handleSetPaymentSuccess={handleSetPaymentSuccess}
              loading={loading}
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
