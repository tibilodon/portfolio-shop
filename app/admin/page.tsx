import CreateCategoryForm from "@/components/forms/admin/category/CreateCategoryForm";
import styles from "./page.module.css";
import prisma from "@/prisma/prismaClient";
import Testy from "./Testy";
import { DBCategory, BuildHierarchyType } from "@/types";
import DeleteCategoryBtn from "@/components/buttons/action/deleteCategory/DeleteCategoryBtn";
import UpdateCategoryForm from "@/components/forms/admin/category/UpdateCategoryForm";

//  ba able to click and modify in detail
//  update stock without click
//  delete without detailed view
//  add, modify, delete categories
//  add new product
//  see and mark orders accordingly

export default async function Admin() {
  const [categories, products, variants] = await Promise.all([
    prisma.category.findMany(),
    prisma.product.findMany(),
    prisma.producVariant.findMany(),
  ]);

  const buildHierarchy = (items: DBCategory[], parentId = null): any =>
    items
      .filter((item: any) => item.parentId === parentId)
      .map((item: any) => ({
        ...item,
        children: buildHierarchy(items, item.id),
      }));
  const renderItems = (items: any, dept: number = 0) =>
    //  what is inline will rename it
    items.map((item: any) => (
      <div key={item.id}>
        <p>{item.name}</p>
        <UpdateCategoryForm id={item.id} name={item.name} />
        <DeleteCategoryBtn id={item.id} />
        {dept < 2 && (
          <div
            style={{
              marginLeft: "20px",
            }}
          >
            <CreateCategoryForm
              label="add category"
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
        <h1>hi admin</h1>
        <CreateCategoryForm label="add MAIN category" />
        <h2>Category hierarchy</h2>
        {renderItems(buildHierarchy(categories))}
      </div>
    </>
  );
}
