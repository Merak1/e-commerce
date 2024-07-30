import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    if (currentUser?.role !== "ADMIN") {
      return NextResponse.error();
    }
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
      packageInfo,
      productType,
    } = body;

    // console.log("images: 🔴");
    // console.log(images);

    let idArray: any[] = [];
    images.forEach((colorElement: any) => {
      const { id } = colorElement;
      idArray.push({ id: id });
    });

    // console.log("idarray  🟠= ");
    // console.log(idArray);
    const product = await prisma.product.create({
      data: {
        id,
        name,
        description,
        price: parseFloat(price),
        brand,
        category,
        inStock,
        images: {
          connect: idArray,
        },
        sku,
        model,
        sales,
        packageInfo,
        productType,
      },
    });
    // console.log("product 🟡 ", product);
    return NextResponse.json(product);
  }
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  if (currentUser.role !== "ADMIN") {
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
