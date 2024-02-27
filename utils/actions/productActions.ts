"use server";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

//  redirect cannot work inside a try-catch block
const setData = async (data: any, formData: FormData) => {
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

      //  upload images to storage
      const supabase = createClient(
        "https://" + process.env.SUPABASE_STORAGE!!,
        process.env.SUPABASE_PUBLIC_ANON_KEY!!
      );

      const files = formData.getAll("image");
      console.log("files:", files);
      if (files) {
        await Promise.all(
          files.map(async (item) => {
            const imageName = String(new Date().getTime());
            const { data, error } = await supabase.storage
              .from("images")
              .upload(imageName, item);
            if (error) {
              console.log("upload error", error);
            }
            //if uploaded, create record in Image table and connect to product
            else {
              //  url
              const fullPath = String(
                "https://" +
                  process.env.SUPABASE_STORAGE!! +
                  "/storage/v1/object/public/images/" +
                  data.path
              );
              await prisma.image.create({
                data: {
                  url: fullPath,
                  product: {
                    connect: {
                      id: product.id,
                    },
                  },
                },
              });

              console.log("img uploaded", data);
            }
          })
        );
      }
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

  const submitData = await setData(data, formData);

  if (submitData) {
    const supabase = createClient(
      "https://" + process.env.SUPABASE_STORAGE!!,
      process.env.SUPABASE_PUBLIC_ANON_KEY!!
    );

    const files = formData.getAll("image");
    if (files) {
      await Promise.all(
        files.map(async (item) => {
          const imageName = String(new Date().getTime());
          const { data, error } = await supabase.storage
            .from("images")
            .upload(imageName, item);
          if (error) {
            console.log("upload error", error);
          } else {
            console.log("img uploaded", data);
          }
        })
      );
    }

    // //  on success
    // return true;

    // //  redirect if ok -- cannot work inside a try-catch block
    return { message: "just testing" };
    // redirect("/admin/product");
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

export async function editProductAction(formData: FormData) {
  const title = String(formData.entries());

  const separator = (data: string) => {
    const regexPattern = /([^_]+)__(.+)/;
    const matchResult = regexPattern.exec(data);
    if (matchResult) {
      const result = {
        id: matchResult[2],
      };
    }
  };

  const variantArray = [];
  for (const pair of Array.from(formData.entries())) {
    //  modify key
    console.log("pairs", pair[0], pair[1]);
    const regexPattern = /^(\w+)__(\d+)__(\w+)$/;
    const matchResult = regexPattern.exec(pair[0]);
    if (matchResult) {
      const obj = {
        id: matchResult[2],
        [matchResult[3]]: pair[1],
      };

      variantArray.push(obj);

      // switch (matchResult[3]) {
      //   case "name":
      //     console.log("paiir1", pair[1]);
      //     // obj.name = pair[1];
      //     break;

      //   default:
      //     break;
      // }
    }
  }
  // for (let index = 0; index < variantArray.length; index++) {
  //   const element = variantArray[index];
  //   for (const [key, value] of Object.entries(element)) {
  //   }
  // }
  console.log(variantArray);
}
