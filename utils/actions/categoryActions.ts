"use server";
import {
  DeleteActionReturnClass,
  CreateCategoryActionReturnVal,
} from "@/classes";
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
        revalidatePath(prevState.pathname);
        return CreateCategoryActionReturnVal.createReturnValue(
          "category created"
        );
      } else {
        return CreateCategoryActionReturnVal.createReturnValue(
          "error @ creating category"
        );
      }
    } catch (error) {
      return CreateCategoryActionReturnVal.createReturnValue(
        "error caught @ try-catch"
      );
    }
  }
  //  create child category
  else {
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
        //  cache busting
        return CreateCategoryActionReturnVal.createReturnValue(
          "alt category created"
        );
      } else {
        return CreateCategoryActionReturnVal.createReturnValue(
          "error @ alt category creation"
        );
      }
    } catch (error) {
      return CreateCategoryActionReturnVal.createReturnValue(
        "error @ alt category creation  - caught @ try - catch"
      );
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
      revalidatePath(pathname);
      return { message: "successful update", pathname: "", id: 0 };
    } else {
      return { message: "error@update", pathname: "", id: 0 };
    }
  } catch (error) {
    return { message: "error", pathname: "", id: 0 };
  }
}
