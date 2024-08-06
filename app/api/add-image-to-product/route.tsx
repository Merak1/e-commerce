import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";

export async function PUT(request: Request) {
  //   console.log("create image 🤍🔴");
  const body = await request.json();
  console.log("body 🔵 ", body);
  //   try {
  //   const body = await request.json();
  // images =[ ]
  const hardCID = "66985eca3f6ac97dc9967d2a";
  const test = "Test kk";
  // const { images } = body;
  console.log(" 🔵🔵🔵THIS  IS add-image-to-product ");
  console.log("body 🔵 ", body);
  console.log("hardCID 🔵 ", hardCID);
  console.log("body 🔵 ", body);
  // console.log("id 🔵 ", id);
  // console.log("color 🔵 ", color);
  // console.log("colorCode 🔵 ", colorCode);
  // console.log("image 🔵 ", image);
  // console.log("name 🔵 ", name);

  const product = await prisma.product.findUnique({
    where: { id: hardCID },
    // where: { name: test },
    // include: { client: true },
  });

  //  product.client.sites = product.client.sites.map((site) =>
  //    site.id === siteId ? { ...site, name: newName } : site
  //  );

  // const updatedProduct = await prisma.product.update({
  //   where: { id: id },
  //   data: {

  //   },
  // });

  // return NextResponse.json("hello");
  return NextResponse.json(product);
  //     return NextResponse.json(product);
  //   } catch (err: any) {
  //     return NextResponse.error();
  //   }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log(" 🔴body: " + body);
    console.log(body);
    let idArray: string[] = [];
    body.forEach((colorElement: any) => {
      const { id } = colorElement;
      idArray.push(id);
    });

    console.log("idArray: 🟠" + idArray);
    const imagesArray: any = [];
    const imageLength = imagesArray.length;

    const imagesFromDb = await prisma.image.findMany({
      where: {
        id: { in: idArray },
      },
    });

    console.log("imagesFromDb: ,", imagesFromDb);
    // // [{ id: 24 }, { id: 42 }]
    // let idArray = new Array(imageLength);
    // console.log("1️⃣ idArray newly created ", idArray);
    // for (let i = 0; i < idArray.length; i++) {
    //   idArray[i] = { id: imagesArray[i] };
    // }

    // console.log("2️⃣ idArray filled ", idArray);

    // const updateUser = await prisma.product.update({
    //   where: {
    //     id: ProductId,
    //   },
    //   data: {
    //     images: {
    //       connect: { id: onlyId },
    //     },
    //   },
    // });

    return NextResponse.json(body);
    // return NextResponse.json(idArray);
  } catch (err: any) {
    return NextResponse.error();
  }
}
