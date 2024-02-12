import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  // if (currentUser?.role !== "ADMIN") {
  //   // return NextResponse.error();
  //   // toast.error("NO ADMIN");
  //   console.log("NO ADMIN");
  // }
  // if (!currentUser) {
  //   // toast.error("NO CURRENT USER");
  //   console.log("NO CURRENT USER");
  //   // return NextResponse.error();
  // }

  // // if (currentUser?.role !== "ADMIN") {
  // //   return NextResponse.error();
  // // }

  const body = await request.json();
  const {
    id,
    name,
    description,
    price,
    brand,
    category,
    inStock,
    images,
    sku,
    model,
    sales,
  } = body;

  const product = await prisma.product.create({
    data: {
      id,
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
      sku,
      model,
      sales,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  if (currentUser.role === "ADMIN") {
    return NextResponse.error();
  }
  const body = await request.json();

  const { id, inStock } = body;

  const product = await prisma.product.update({
    where: { id: id },
    data: { inStock },
  });

  return NextResponse.json(product);
}
