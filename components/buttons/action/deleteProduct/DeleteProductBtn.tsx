"use client";
import styles from "./deleteProductBtn.module.css";
import { useTransition } from "react";
import { usePathname } from "next/navigation";
import { deleteProductAction } from "@/utils/actions";

type Props = { id: number; images: string[] };

const DeleteProductBtn: React.FunctionComponent<Props> = ({ id, images }) => {
  let [isPending, startTransition] = useTransition();
  return (
    <>
      <div className={styles.wrap}>
        <button
          disabled={isPending}
          onClick={() => startTransition(() => deleteProductAction(id, images))}
        >
          delete product
        </button>
      </div>
    </>
  );
};

export default DeleteProductBtn;
