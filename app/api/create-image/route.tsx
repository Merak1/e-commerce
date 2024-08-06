import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function POST(request: Request) {
  console.log("create image");
  try {
    const body = await request.json();
    // console.log("body", body);
    // if (currentUser) {
    //   if (currentUser?.role !== "ADMIN") {
    //     return NextResponse.error();
    //   }

    const { id, color, colorCode, image, name } = body;

    console.log("id 🔵 ", id);
    console.log("color 🔵 ", color);
    console.log("colorCode 🔵 ", colorCode);
    console.log("image 🔵 ", image);
    console.log("name 🔵 ", name);

    const newImage = await prisma.image.create({
      // where: { id: id },
      data: {
        id,
        color,
        colorCode,
        image,
        name,
      },
    });

    //  product.client.sites = product.client.sites.map((site) =>
    //    site.id === siteId ? { ...site, name: newName } : site
    //  );

    return NextResponse.json(newImage);
  } catch (err: any) {
    return NextResponse.error();
  }
}
