import styles from "./page.module.css";
import prisma from "@/prisma/prismaClient";
import UpdateCategoryForm from "@/components/forms/admin/category/UpdateCategoryForm";
import DeleteCategoryBtn from "@/components/buttons/action/deleteCategory/DeleteCategoryBtn";
import CreateCategoryForm from "@/components/forms/admin/category/CreateCategoryForm";
import { DBCategory } from "@/types";

export default async function Category() {
  //  fetch data
  const data = await prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });

  //  organize data recursively
  const buildHierarchy = (items: DBCategory[], parentId = null): any =>
    items
      .filter((item: any) => item.parentId === parentId)
      .map((item: any) => ({
        ...item,
        children: buildHierarchy(items, item.id),
      }));

  //  create ui recursively
  const renderItems = (items: any, dept: number = 0) =>
    items.map((item: any) => (
      <div className={styles.treeWrap} key={item.id}>
        <div className={styles.main}>
          <span className={styles.name}>
            <p>Category Name: </p>
            <strong>{item.name}</strong>
          </span>
          <UpdateCategoryForm id={item.id} name={item.name} />
          <DeleteCategoryBtn id={item.id} />
        </div>
        {dept < 2 && (
          <div className={styles.alt}>
            <CreateCategoryForm
              label="add alt category"
              parentId={item?.children.parentId || item.id}
            />
            {renderItems(item.children, dept + 1)}
          </div>
        )}
      </div>
    ));
  return (
    <>
      <div className={styles.wrap}>
        <h1>Edit categories</h1>
        <div className={styles.edit}>
          <CreateCategoryForm label="add MAIN category" />
        </div>
        <div className={styles.tree}>
          <h3>Existing categories</h3>
          {renderItems(buildHierarchy(data))}
        </div>
      </div>
    </>
  );
}
