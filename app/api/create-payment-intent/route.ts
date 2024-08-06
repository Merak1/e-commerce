import Stripe from "stripe";

import primsa from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { rountToTwoDecimals } from "@/utils/roundToTwoDecimals";
import { CartProductType } from "@/app/product/[product.id]/ProductDetails";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  const formatedPrice = rountToTwoDecimals(totalPrice);
  return formatedPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id, shipping } = body;

  // console.log("items ", items);
  // console.log("❎ 🟥 shipping ❎ 🟥 ", shipping);
  console.log("❎ 🟥 items ❎ 🟥 ", items);
  // console.log("payment_intent_id ", payment_intent_id);
  // console.log(
  //   "total before converting to cents  ",
  //   calculateOrderAmount(items)
  // );

  let total = Math.round(calculateOrderAmount(items) * 100 + shipping * 100); // stripe takes payment in cents ????

  console.log("total 😀 ", total);
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "mxn", // pesos mexicanos
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
    shippingDetails: {},
    addresses: {},
  };

  console.log("orderData 💙", orderData);

  if (payment_intent_id) {
    //update the order
    console.log("There is payment intent 👍");
    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (currentIntent) {
      console.log("There currentIntent  👍👍");
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );

      let idArray: any[] = [];
      items.forEach((colorElement: any) => {
        const { id } = colorElement;
        idArray.push({ id: id });
      });

      console.log("idArray ", idArray);
      // update the order
      const [existing_order, updated_order] = await Promise.all([
        prisma?.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),

        prisma?.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: { connect: idArray },
          },
        }),
      ]);

      if (!existing_order) {
        return NextResponse.json(
          { error: "Invalid Payment Intent" },
          { status: 400 }
        );
      }
      return NextResponse.json({ paymentIntent: updated_intent });
    }
  } else {
    // create payment intent, then
    console.log("There is No payment intent 👎");

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "mxn", // change to mxn
      automatic_payment_methods: { enabled: true },
    });

    //create the order
    orderData.paymentIntentId = paymentIntent.id;

    const paymentIntentId = paymentIntent.id;

    console.log(" currentUser 🤍", currentUser);

    const order = await prisma?.order.create({
      data: {
        // user: { connectOrCreate: { id: currentUserId } },
        amount: total,
        currency: "mxn", // pesos mexicanos
        status: "pending",
        deliveryStatus: "pending",
        paymentIntentId: paymentIntent.id,
        shippingDetails: {},
        addresses: {
          city: "",
          country: "",
          line1: "",
          postal_code: "",
          state: "",
        },
        user: { connect: { id: currentUser.currentUserId } },
      },
    });

    console.log("order🧅", order);
    return NextResponse.json({ paymentIntent });
  }
}
