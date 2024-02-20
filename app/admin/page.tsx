import CategoryForm from "@/components/forms/admin/category/CategoryForm";
import styles from "./page.module.css";
import prisma from "@/prisma/prismaClient";
import Testy from "./Testy";

//  ba able to click and modify in detail
//  update stock without click
//  delete without click
//  add, modify, delete categories
//  add new product
//  see and mark orders accordingly

export default async function Admin() {
  // const categories = await prisma.category.findMany();
  // const products = await prisma.product.findMany();
  // const variants = await prisma.producVariant.findMany();
  const [categories, products, variants] = await Promise.all([
    prisma.category.findMany(),
    prisma.product.findMany(),
    prisma.producVariant.findMany(),
  ]);
  console.log(categories);

  const buildHierarchy = (items: any, parentId = null) =>
    items
      .filter((item: any) => item.parentId === parentId)
      .map((item: any) => ({
        ...item,
        children: buildHierarchy(items, item.id),
      }));
  // console.log(buildHierarchy(categories));
  const data = buildHierarchy(categories);
  return (
    <>
      <div className={styles.wrap}>
        <h1>hi admin</h1>
        <CategoryForm label="add MAIN category" />
        {/* {categories &&
          categories.map((item) => {
            const { parentId, name, id } = item;
            return (
              <div key={id} className={styles.items}>
                <h5>{name}</h5>
                <h4>id: {id}</h4>
                <h4>parentId: {parentId}</h4>

           
                <CategoryForm parentId={id} label="add child category" />
              </div>
            );
          })} */}
        <Testy data={data} />
        {data.map((item: any) => {
          const { id, children } = item;
          return (
            <div className={styles.items} key={id}>
              <h2>
                {children.map((child: any) => (
                  <p key={child.id}>{child.name}</p>
                ))}
              </h2>
            </div>
          );
        })}
      </div>
    </>
  );
}
