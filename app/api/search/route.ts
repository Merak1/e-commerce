import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (query) {
    try {
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
      return NextResponse.json(product);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
