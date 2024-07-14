import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  try {
    const currentUser = await getCurrentUser();
    const body = await request.json();
    if (currentUser) {
      if (currentUser?.role !== "ADMIN") {
        return NextResponse.error();
      }

      const { payment_intent_id, packagesDetails: shippingDetails } = body;
      const { success, order_id, data, courier } = shippingDetails;
      const { orderId, trackingNumber, labelsNumber, amount, dataArray } = data;

      const order = await prisma.order.update({
        where: { paymentIntentId: payment_intent_id },
        data: {
          shippingDetails: {
            success: success,
            order_id: order_id,
            courier: courier,
            data: {
              trackingNumber: trackingNumber,
              labelsNumber: labelsNumber,
              amount: amount,
              dataArray: dataArray,
            },
          },
        },
      });
      // console.log("❤️‍🔥order", order);
      return NextResponse.json(order);
    }
  } catch (err: any) {
    return NextResponse.error();
  }
}
