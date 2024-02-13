import prisma from "@/libs/prismadb";

export default async function getProductsById(params: string) {
  try {
    const productId = params;
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
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
