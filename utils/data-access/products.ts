import prisma from "@/prisma/prismaClient";

export const getProductById = async (id: number) => {
  const res = await prisma.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      variants: true,
      images: true,
    },
  });
  return res;
};
