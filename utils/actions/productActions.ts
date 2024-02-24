"use server";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

//  redirect cannot work inside a try-catch block
const setData = async (data: any) => {
  try {
    //  submit product
    const { name, description, price, stock, highlighted, category } = data;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        highlighted,
        category: {
          connect: {
            name: category,
          },
        },
      },
    });

    //  submit and connect variant
    if (product.id) {
      const variantKeys = Object.keys(data).filter((key) =>
        key.startsWith("var__name__")
      );
      await Promise.all(
        variantKeys.map(async (key) => {
          const index = key.split("__")[2];
          const variantName = data[`var__name__${index}`];
          const variantPrice = parseInt(data[`var__price__${index}`]);
          const variantStock = parseInt(data[`var__stock__${index}`]);

          const variant = await prisma.producVariant.create({
            data: {
              name: variantName,
              price: variantPrice,
              stock: variantStock,
              product: {
                connect: { id: product.id },
              },
            },
          });

          return variant;
        })
      );
      //  on success
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export async function createProduct(
  prevState: {
    message: string;
  },
  formData: FormData
) {
  const formDataArray = Array.from(formData.entries());
  //    chain formData queries together
  const data = Object.fromEntries(
    formDataArray.map(([key, value]) => {
      switch (key) {
        case "price":
          return [key, Number(value)];
        case "stock":
          return [key, Number(value)];
        case "highlighted":
          return [key, Boolean(value)];
        default:
          return [key, String(value)];
      }
    })
  );

  const submitData = await setData(data);

  if (submitData) {
    //  redirect if ok -- cannot work inside a try-catch block
    redirect("/admin/product");
  } else {
    return { message: "cannot submit product data" };
  }
}

export async function test(formData: FormData) {
  // name,desc,price, stock, highlighted, !!variants, category, !!images
  //    tables: product, productVariant, image
  //    use: category
  //   const data = String(formData.get("name"));
  const formDataArray = Array.from(formData.entries());
  //    chain formData queries together
  const data = Object.fromEntries(
    formDataArray.map(([key, value]) => {
      switch (key) {
        case "price":
          return [key, Number(value)];
        case "stock":
          return [key, Number(value)];
        case "highlighted":
          return [key, Boolean(value)];

        default:
          return [key, String(value)];
      }
    })
  );

  //submit data
  try {
    //  submit product
    const { name, description, price, stock, highlighted, category } = data;
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        stock,
        highlighted,
        category: {
          connect: {
            name: category,
          },
        },
      },
    });

    //  submit and connect variant if any
    if (product.id) {
      const variantKeys = Object.keys(data).filter((key) =>
        key.startsWith("var__name__")
      );
      const variants = await Promise.all(
        variantKeys.map(async (key) => {
          const index = key.split("__")[2];
          const variantName = data[`var__name__${index}`];
          const variantPrice = parseInt(data[`var__price__${index}`]);
          const variantStock = parseInt(data[`var__stock__${index}`]);

          const variant = await prisma.producVariant.create({
            data: {
              name: variantName,
              price: variantPrice,
              stock: variantStock,
              product: {
                connect: { id: product.id },
              },
            },
          });

          return variant;
        })
      );

      console.log(
        "Product and variants inserted successfully:",
        product,
        variants
      );
    }
  } catch (error) {
    console.log(error);
  }
}
