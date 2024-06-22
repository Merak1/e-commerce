import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getImages(params: IProductParams) {
  try {
    const { category, searchTerm } = params;
    let searchString = searchTerm;

    if (!searchTerm) {
      searchString = "";
    }

    let query: any = {};

    if (category) {
      query.category = category;
    }
    const products = await prisma.product.findMany({
      where: {
        ...query,
        OR: [
          {
            name: {
              contains: searchString,
              mode: "insensitive",
            },
            description: {
              contains: searchString,
              mode: "insensitive",
            },
          },
        ],
      },
    });

    // console.log("produts from getImages", products);
    let images: { color: string; colorCode: string; image: string }[] = [];
    products.forEach((product) => {
      // console.log("im one product.images 🟠 ", product.images);
      images = [...images, ...product.images];
    });

    // console.log("images 😫", images);

    return images;
  } catch (error: any) {
    throw new Error(error);
  }
}
