"use server";
import prisma from "@/prisma/prismaClient";
import { redirect } from "next/navigation";

export const getProductData = async () => {
  try {
    const res = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });
    if (res) {
      return res;
    } else {
      redirect("/error");
    }
  } catch (error) {
    redirect("/error");
  }
};

export const getCategoriesData = async (parent: boolean) => {
  try {
    const res = await prisma.category.findMany({
      include: {
        parent: parent,
        subcategories: {
          include: {
            subcategories: true,
          },
        },
      },
    });

    if (res) {
      return res;
    } else {
      redirect("/error");
    }
  } catch (error) {
    redirect("/error");
  }
};
