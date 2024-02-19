import SetCookie from "@/components/buttons/navigate/setCookie/SetCookie";
import styles from "./cookieBar.module.css";

const CookieBar = async () => {
  return (
    <>
      <div className={styles.wrap}>
        <h1>CookieBar</h1>
        <SetCookie />
      </div>
    </>
  );
};

export default CookieBar;
