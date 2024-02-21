"use server";
import { DeleteActionReturnClass } from "@/classes";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";

export async function createCategory(
  prevState: {
    message: string;
    pathname: string;
    parentId: number;
  },
  formData: FormData
) {
  const data = String(formData.get("name"));

  //  create main category
  if (prevState.parentId === 0) {
    try {
      const resp = await prisma.category.create({
        data: {
          name: data,
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
          name: data,
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

//  delete based on passed in id
export async function deleteCategory(id: number, pathname: string) {
  try {
    const resp = await prisma.category.deleteMany({
      where: {
        id: id,
      },
    });
    revalidatePath(pathname);
  } catch (error) {
    console.log(error);
  }
}

export async function updateCategory(
  prevState: {
    message: string;
    pathname: string;
    id: number;
  },
  formData: FormData
) {
  const { pathname, id } = prevState;
  const data = String(formData.get("category"));

  if (data === "") {
    return { message: " error: field is empty", pathname: "", id: 0 };
  }

  try {
    const resp = await prisma.category.update({
      where: {
        id: id,
      },
      data: {
        name: data,
      },
    });
    if (resp) {
      console.log("resp back", resp);
      revalidatePath(pathname);
      return { message: "successful update", pathname: "", id: 0 };
    } else {
      return { message: "error@update", pathname: "", id: 0 };
    }
  } catch (error) {
    return { message: "error", pathname: "", id: 0 };
  }
}
