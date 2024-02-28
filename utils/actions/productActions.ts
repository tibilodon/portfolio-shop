"use server";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

//upsert variants

const supabase = createClient(
  "https://" + process.env.SUPABASE_STORAGE!!,
  process.env.SUPABASE_PUBLIC_ANON_KEY!!
);

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
        key.startsWith("var__")
      );
      console.log("variantKeys", variantKeys);
      await Promise.all(
        variantKeys.map(async (key) => {
          const pattern = /__(\d+)__/;
          const match = key.match(pattern);
          if (match) {
            const index = match[1];
            // const index = key.split("__")[2];
            const variantName = data[`var__${index}__name`];
            const variantPrice = parseInt(data[`var__${index}__price`]);
            const variantStock = parseInt(data[`var__${index}__stock`]);

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
          }
        })
      );

      //  upload images to storage
      const files = Array.from(formData.getAll("image"));
      //  check for images
      const existingFiles = (): boolean => {
        let res: boolean = false;
        files.forEach((file) => {
          if (
            typeof file === "object" &&
            file !== null &&
            file instanceof Blob
          ) {
            const size = Number(file.size);
            if (size > 0) {
              res = true;
            } else {
              res = false;
            }
          } else {
            console.log("Not a file object:", file);
            res = false;
          }
        });
        return res;
      };

      if (existingFiles()) {
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

              // console.log("img uploaded", data);
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
    // const supabase = createClient(
    //   "https://" + process.env.SUPABASE_STORAGE!!,
    //   process.env.SUPABASE_PUBLIC_ANON_KEY!!
    // );

    // const files = formData.getAll("image");
    // if (files) {
    //   await Promise.all(
    //     files.map(async (item) => {
    //       const imageName = String(new Date().getTime());
    //       const { data, error } = await supabase.storage
    //         .from("images")
    //         .upload(imageName, item);
    //       if (error) {
    //         console.log("upload error", error);
    //       } else {
    //         console.log("img uploaded", data);
    //       }
    //     })
    //   );
    // }

    // //  on success
    // return true;

    // //  redirect if ok -- cannot work inside a try-catch block
    redirect("/admin/product");
    // return { message: "just testing" };
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

export async function editProductAction(productId: number, formData: FormData) {
  const title = String(formData.entries());
  // const data = formData.entries();s
  for (const pair of Array.from(formData.entries())) {
    console.log(pair[0], pair[1]);
  }

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
        id: Number(matchResult[2]),
        [matchResult[3]]: pair[1],
      };

      variantArray.push(obj);
    }
  }

  //organize variants data if any
  console.log(variantArray);
  if (variantArray.length > 0) {
    console.log("hehhh");
    const mergedData = variantArray.reduce((acc: any, obj: any) => {
      const foundObj = acc.find((item: any) => item.id === obj.id);
      if (foundObj) {
        Object.assign(foundObj, obj);
      } else {
        acc.push(obj);
      }
      return acc;
    }, []);

    console.log(mergedData);
    // await Promise.all(upsertVariant(mergedData));
    await upsertVariant(mergedData, productId);
  }
}

export const upsertVariant = async (variantData: any[], productId: number) => {
  console.log("productId", productId);
  try {
    const promises = variantData.map(async (item) => {
      const { name, stock, price } = item;
      console.log("the item-----", item);
      await prisma.producVariant.upsert({
        where: { id: item.id },
        update: {
          name,
          stock: Number(stock),
          price: Number(price),
        },
        create: {
          id: undefined,
          productId: productId,
          name,
          stock: Number(stock),
          price: Number(price),
        },
      });
    });
    // return promises
    await Promise.all(promises);
  } catch (error) {
    console.log("error, @variant upsert", error);
  }
};

export async function deleteProductAction(id: number, images: string[]) {
  const resp = await prisma.$transaction(async (tx) => {
    await Promise.all([
      tx.producVariant.deleteMany({
        where: {
          productId: id,
        },
      }),
      tx.image.deleteMany({
        where: {
          productId: id,
        },
      }),
      //  delete images from storage as well
      supabase.storage.from("images").remove(images),

      tx.product.delete({
        where: {
          id: id,
        },
      }),
    ]);
  });

  redirect("/admin/product");
}
