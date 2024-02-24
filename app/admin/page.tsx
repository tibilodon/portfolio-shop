import styles from "./page.module.css";
import Link from "next/link";

//  ba able to click and modify in detail
//  update stock without click
//  delete without detailed view
//  add, modify, delete categories
//  add new product
//  see and mark orders accordingly

export default async function Admin() {
  return (
    <>
      <div className={styles.wrap}>
        <h1>hi admin</h1>

        <div className={styles.pages}>
          <Link href={"/admin/category"}>
            <h4>Edit Categories</h4>
          </Link>
          <Link href={"/admin/product"}>
            <h4>Edit Products</h4>
          </Link>
        </div>
      </div>
    </>
  );
}
