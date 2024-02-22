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

      const { id, deliveryStatus } = body;

      const order = await prisma.order.update({
        where: { id: id },
        data: { deliveryStatus },
      });

      return NextResponse.json(order);
    }
  } catch (err: any) {
    return NextResponse.error();
  }
}
