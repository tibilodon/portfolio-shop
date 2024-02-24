import styles from "./page.module.css";
export default async function EditProduct({
  params,
}: {
  params: { id: number };
}) {
  return (
    <>
      <div className={styles.wrap}>
        <h1>{params.id}</h1>
      </div>
    </>
  );
}
