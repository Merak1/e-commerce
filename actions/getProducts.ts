import prisma from "@/libs/prismadb";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getProducts(params: IProductParams) {
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
    console.log("query in getproducts 🎪", query);
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
      //   include: { // TODO
      //     reviews: { // ofertas
      //         include: {
      //             user: true
      //         },
      // orderBy: { // ofertas
      // createDate: 'desc'
      // }
      //     }
      //   }
    });
    console.log("products from getProducts 🧡", products);
    return products;
  } catch (error: any) {
    throw new Error(error);
  }
}
