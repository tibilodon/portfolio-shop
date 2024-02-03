import styles from "./page.module.css";

//get data from cookies, if empty return slide-in / sidebar type empty cart page

export default function Cart() {
  return (
    <>
      <div className={styles.wrap}>
        <h1>hello cart</h1>
      </div>
    </>
  );
}
