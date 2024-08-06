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
    let images: {
      color: string;
      colorCode: string;
      image: string;
      name: string;
    }[] = [];
    products.forEach((product: any) => {
      // console.log("im one product.images 🟠 ", product.images);
      images = [...images, ...product.imageIDs];
    });

    console.log("images 😫", images.length);

    let unique = (arr: any[], track = new Set()) =>
      arr.filter(({ image }) => (track.has(image) ? false : track.add(image)));

    console.log("🧧 unique 🧧", unique(images));
    console.log("🧧 unique 🧧", unique(images).length);

    return unique(images);
  } catch (error: any) {
    throw new Error(error);
  }
}
