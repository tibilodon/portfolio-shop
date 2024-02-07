import Image from "next/image";
import styles from "./page.module.css";
import PlaceholderP from "@/components/test/PlaceholderP";
import TestButton from "@/components/test/TestButton";
import ImageSlider from "@/components/pages/home/imageSlider/ImageSlider";
import { CustomMetaData } from "@/utils/helpers";

export const metadata = new CustomMetaData(
  "Shop - home page",
  "Shop homepage description"
);

export default function Home() {
  return (
    <>
      <div className={styles.wrap}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <h1>hello world</h1>
          <TestButton />
        </span>
        {/* <PlaceholderP />
        <PlaceholderP />
        <PlaceholderP /> */}
        <ImageSlider />
      </div>
    </>
  );
}
