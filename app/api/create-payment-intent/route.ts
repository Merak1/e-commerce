import Stripe from "stripe";

import primsa from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { CartProductType } from "@/app/product/[product.id]/ProductDetails";
import { getCurrentUser } from "@/actions/getCurrentUser";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2023-10-16",
});

const calculateOrderAmount = (items: CartProductType[]) => {
  const totalPrice = items.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + itemTotal;
  }, 0);
  // const finalPrice = Number(totalPrice.toFixed(2));
  // const finalPrice = Math.floor(totalPrice);
  // return finalPrice;
  return totalPrice;
};

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;

  console.log("items ", items);
  console.log("payment_intent_id ", payment_intent_id);

  const total = calculateOrderAmount(items) * 100; // stripe takes payment in cents ????

  console.log("total 😀 ", total);
  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: "usd", // pesos mexicanos
    status: "pending",
    deliveryStatus: "pending",
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
    //update the order

    const currentIntent = await stripe.paymentIntents.retrieve(
      payment_intent_id
    );

    if (currentIntent) {
      const updated_intent = await stripe.paymentIntents.update(
        payment_intent_id,
        { amount: total }
      );
      // update the order
      const [existing_order, updated_order] = await Promise.all([
        prisma?.order.findFirst({
          where: { paymentIntentId: payment_intent_id },
        }),

        prisma?.order.update({
          where: { paymentIntentId: payment_intent_id },
          data: {
            amount: total,
            products: items,
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

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd", // change to mxn
      automatic_payment_methods: { enabled: true },
    });

    //create the order
    orderData.paymentIntentId = paymentIntent.id;

    await prisma?.order.create({
      data: orderData,
    });

    return NextResponse.json({ paymentIntent });
  }
}
