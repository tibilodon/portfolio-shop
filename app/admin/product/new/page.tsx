import CreateProductForm from "@/components/forms/admin/product/CreateProductForm";
import styles from "./page.module.css";
import prisma from "@/prisma/prismaClient";

export default async function CreateProduct() {
  const categories = await prisma.category.findMany({
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
  });
  //  add create server actions
  //  same component can be used for update with different actions
  return (
    <>
      <div className={styles.wrap}>
        <h1>create product</h1>

        <CreateProductForm categories={categories} />
      </div>
    </>
  );
}
