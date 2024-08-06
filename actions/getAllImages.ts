import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export interface IProductParams {
  category?: string | null;
  searchTerm?: string | null;
}

export default async function getAllImages() {
  try {
    const images = await prisma?.image.findMany();
    // console.log("images burn ❤️‍🔥", images);
    return images;
  } catch (error: any) {
    throw new Error(error);
  }
}
