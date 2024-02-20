"use server";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export default async function createCategory(
  prevState: {
    message: string;
    pathname: string;
    parentId: number;
  },
  formData: FormData
) {
  const data = {
    name: String(formData.get("name")),
    parentId: formData.get("parentId"),
  };

  //  create main category
  if (prevState.parentId === 0) {
    try {
      const resp = await prisma.category.create({
        data: {
          name: data.name,
        },
      });
      if (resp) {
        console.log("resp back", resp);
        revalidatePath(prevState.pathname);
        return { message: "coolie", pathname: "", parentId: 0 };
      } else {
        return { message: "error", pathname: "", parentId: 0 };
      }
    } catch (error) {
      return { message: "error", pathname: "", parentId: 0 };
    }
  }
  //  create child category
  else {
    console.log(prevState.parentId);
    try {
      const resp = await prisma.category.create({
        data: {
          name: data.name,
          parent: {
            connect: {
              id: prevState.parentId,
            },
          },
        },
      });
      if (resp) {
        console.log("resp back", resp);
        revalidatePath(prevState.pathname);
        return { message: "coolie", pathname: "", parentId: 0 };
      } else {
        return { message: "error", pathname: "", parentId: 0 };
      }
    } catch (error) {
      return { message: "error", pathname: "", parentId: 0 };
    }
  }
}
