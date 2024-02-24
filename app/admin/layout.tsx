import styles from "./page.module.css";
import Link from "next/link";
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <section className={styles.layout}>
        <nav className={styles.nav}>
          <ol>
            <li>
              <Link href={"/admin/category"}>
                <h4>Edit Categories</h4>
              </Link>
            </li>
            <li>ADMIN</li>
            <li>
              <Link href={"/admin/product"}>
                <h4>Edit Products</h4>
              </Link>
            </li>
          </ol>
        </nav>
        {children}
      </section>
    </>
  );
}
