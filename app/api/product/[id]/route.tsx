import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const currentUser = await getCurrentUser();

  const product = await prisma?.product.delete({
    where: { id: params.id },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = await getCurrentUser();
  if (currentUser) {
    if (currentUser?.role !== "ADMIN") {
      return NextResponse.error();
    }
    const body = await request.json();
    const { id, productData } = body;

    const {
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
    } = productData;

    console.log("id", id);
    console.log("name", name);
    console.log("description", description);
    console.log("price", price);
    console.log("brand", brand);
    console.log("category", category);
    console.log("inStock", inStock);
    console.log("images", images);
    console.log("sku", sku);
    console.log("model", model);
    console.log("sales", sales);
    console.log("packageInfo", packageInfo);
    console.log("productType", productType);
    // console.log("leets see if packageInfo is getting in");
    // console.log("packageInfo 😫😫😫😫😫", packageInfo);

    const product = await prisma?.product.update({
      where: { id: id },
      data: {
        // id,
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
        packageInfo,
        productType,
      },
    });

    return NextResponse.json(product);
  }
}
