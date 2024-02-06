import styles from "./noImage.module.css";
import Image from "next/image";
import noImg from "@/static/no_image.svg";

type Props = {};

const NoImage = (props: Props) => {
  return (
    <>
      <div className={styles.wrap}>
        <Image
          width={50}
          height={50}
          src={noImg}
          alt={`image is not available`}
        />
        <strong>No Image available</strong>
      </div>
    </>
  );
};

export default NoImage;
