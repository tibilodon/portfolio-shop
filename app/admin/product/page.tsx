import DeleteProductBtn from "@/components/buttons/action/deleteProduct/DeleteProductBtn";
import styles from "./page.module.css";
import prisma from "@/prisma/prismaClient";
import { getProductData } from "@/utils/actions";
import Link from "next/link";

export default async function Product() {
  const [categories, products] = await Promise.all([
    // only include very last subcategory
    prisma.category.findMany({
      where: {
        subcategories: {
          none: {},
        },
      },
      include: {
        parent: false,
        subcategories: {
          include: {
            subcategories: true,
          },
        },
      },
    }),
    getProductData(),
  ]);

  //  map out products, click -> link to edit
  //  link to create new product
  return (
    <>
      <div className={styles.wrap}>
        <h1>edit products</h1>

        <Link href={"/admin/product/new"}>create new product</Link>
        {products &&
          products.map((item) => {
            return (
              <div key={item.id} className={styles.edit}>
                <Link href={"/admin/product/" + item.id}>
                  <strong>edit : {item.name}</strong>
                </Link>
                {/* <DeleteProductBtn id={item.id} /> */}
              </div>
            );
          })}
      </div>
    </>
  );
}
