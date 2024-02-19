import SetCookie from "@/components/buttons/navigate/setCookie/SetCookie";
import styles from "./cookieBar.module.css";
import { getCookie } from "@/utils/cookieActions";

const CookieBar = async () => {
  // const isSet = await getCookie("tnc");
  return (
    <>
      {/* {isSet?.value !== "1" ? (
        <div className={styles.wrap}>
          <h1>CookieBar</h1>
          <SetCookie />
        </div>
      ) : null} */}
      <div className={styles.wrap}>
        <h1>CookieBar</h1>
        <SetCookie />
      </div>
    </>
  );
};

export default CookieBar;
