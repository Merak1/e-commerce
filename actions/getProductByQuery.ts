import prisma from "@/libs/prismadb";

export default async function getProductByQuery(params: string) {
  console.log("params: ", params);

  try {
    const query = params;
    const product = await prisma.product.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            brand: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            category: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            model: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    if (!product) {
      return null;
    }
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
