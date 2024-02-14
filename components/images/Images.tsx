import styles from "./images.module.css";
import Image from "next/image";
import noImg from "@/static/no_image.svg";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

type Props = {
  image?: string | StaticImport;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
  alt: string;
  stock?: number;
};

const Images: React.FunctionComponent<Props> = ({
  image,
  width,
  height,
  alt,
  stock,
}) => {
  return (
    <>
      {image ? (
        <div className={styles.wrap}>
          <Image
            className={stock && stock > 1 ? styles.noImage : ""}
            width={width ? width : 50}
            height={height ? height : 50}
            src={image}
            alt={`product image: ${alt}`}
          />
          {stock && stock < 1 && <strong>Out of stock</strong>}
        </div>
      ) : (
        <div className={styles.wrap}>
          <Image
            className={styles.noImg}
            width={width ? width : 50}
            height={height ? height : 50}
            src={noImg}
            alt={`image is not available`}
          />
          {stock && stock < 1 ? (
            <strong>Out of stock</strong>
          ) : (
            <strong>No Image available</strong>
          )}
        </div>
      )}
    </>
  );
};

export default Images;
