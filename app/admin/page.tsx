import CreateCategoryForm from "@/components/forms/admin/category/CreateCategoryForm";
import styles from "./page.module.css";
import prisma from "@/prisma/prismaClient";
import Testy from "./Testy";
import { DBCategory, BuildHierarchyType } from "@/types";
import DeleteCategoryBtn from "@/components/buttons/action/deleteCategory/DeleteCategoryBtn";
import UpdateCategoryForm from "@/components/forms/admin/category/UpdateCategoryForm";
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
            <h5>Edit Categories</h5>
          </Link>
        </div>
      </div>
    </>
  );
}
