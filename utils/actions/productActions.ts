"use server";
import prisma from "@/prisma/prismaClient";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import { getProductById } from "../data-access/products";

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
      const files = Array.from(formData.getAll("image"));
      //  check for images

      //  for bulk uploads - as only checks them at once
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
  // const data = formData.entries();
  const product = await getProductById(productId);
  const variants = product?.variants;
  const images = product?.images;

  const variantArray = [];
  for (const pair of Array.from(formData.entries())) {
    //  modify key
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
  if (variantArray.length > 0) {
    const mergedData = variantArray.reduce((acc: any, obj: any) => {
      const foundObj = acc.find((item: any) => item.id === obj.id);
      if (foundObj) {
        Object.assign(foundObj, obj);
      } else {
        acc.push(obj);
      }
      return acc;
    }, []);

    //  fetch all variants and delete ones that are not present
    //  get the ids from the updated data
    const updatedVariantIds = mergedData?.map((item: any) => item.id);
    //  filter db with updated variants
    const deleteAbleVariants = variants?.filter(
      (item) => !updatedVariantIds.includes(item.id)
    );
    //--------------------------------------
    // //  upsert variants
    await upsertVariant(mergedData, productId);

    //  delete variants if any
    if (deleteAbleVariants) {
      await deleteVariants(deleteAbleVariants);
    }
  }

  const files = Array.from(formData.keys())
    .filter((key) => key.startsWith("image__"))
    .map((key) => formData.get(key));

  //  check for images
  const filesArray: any = [];

  files.forEach((file) => {
    if (typeof file === "object" && file !== null && file instanceof Blob) {
      const size = Number(file.size);
      if (size > 0) {
        //  push eligible files
        filesArray.push(file);
      }
    }
  });

  //  if new files upload to storage, create record in db

  if (filesArray.length) {
    await Promise.all(
      filesArray.map(async (item: any) => {
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
                  id: productId,
                },
              },
            },
          });
        }
      })
    );
  }

  //--------------------------------------
  // compare with db -- delete missing items
  const imagesRemaining: number[] = [];
  for (const pair of Array.from(formData.entries())) {
    //  modify key
    let regexPattern = /^image__(\d+)$/;
    const matchResult = pair[0].match(regexPattern);
    if (matchResult) {
      imagesRemaining.push(Number(matchResult[1]));
      // }
    }
  }
  //  filter array, delete from db and storage
  const deleteElements = images?.filter(
    (item) => !imagesRemaining.includes(item.id)
  );
  //  TODO: delete from db
  if (deleteElements?.length) {
    await Promise.all(
      deleteElements.map(async (item) => {
        const { id } = item;
        await prisma.image.delete({
          where: {
            id,
          },
        });
      })
    );
  }

  const mapDeleteElements = deleteElements?.map(
    (item) => item.url.split("/images/")[1]
  );

  //  delete from storage
  if (mapDeleteElements?.length) {
    const { error: deleteImgError } = await supabase.storage
      .from("images")
      .remove(mapDeleteElements);

    if (deleteImgError) {
      console.log("error @img delete", deleteImgError);
    }
  }

  redirect("/admin/product");
}

export type Variant = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  price: number;
  stock: number;
  productId: number;
};

export const deleteVariants = async (variants: Variant[]) => {
  try {
    const promises = variants.map(async (item) => {
      const { id } = item;
      await prisma.producVariant.delete({
        where: {
          id: id,
        },
      });
    });
    await Promise.all(promises);
  } catch (error) {
    console.log("error @ deleting variants", error);
  }
};

export const upsertVariant = async (variantData: any[], productId: number) => {
  try {
    const promises = variantData.map(async (item) => {
      const { name, stock, price } = item;

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
