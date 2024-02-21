"use client";
import styles from "./deleteCategoryBtn.module.css";
import { deleteCategory } from "@/utils/categoryActions";
import { useTransition } from "react";
import { usePathname } from "next/navigation";

type Props = { id: number };

const DeleteCategoryBtn: React.FunctionComponent<Props> = ({ id }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();
  return (
    <>
      <div className={styles.wrap}>
        <button
          disabled={isPending}
          onClick={() => startTransition(() => deleteCategory(id, pathname))}
        >
          delete category
        </button>
      </div>
    </>
  );
};

export default DeleteCategoryBtn;
