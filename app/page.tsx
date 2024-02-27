import Image from "next/image";
import styles from "./page.module.css";
import PlaceholderP from "@/components/test/PlaceholderP";
import TestButton from "@/components/test/TestButton";
import ImageSlider from "@/components/pages/home/imageSlider/ImageSlider";
import { CustomMetaData } from "@/utils/helpers";
import prisma from "@/prisma/prismaClient";
import { VariantType } from "@/components/cards/product/ProductCard";
import { redirect } from "next/navigation";
import Loading from "./loading";

export const metadata = new CustomMetaData(
  "Shop - home page",
  "Shop homepage description"
);

export type ProductType = {
  id: number;
  created_at: Date;
  updated_at: Date | null;
  name: string;
  description: string;
  highlighted: boolean;
  categoryId: string | null;
  // imageUrl: string;
  variants: VariantType[];
  price: number;
  stock: number;
};

export default async function Home() {
  //  fetch data
  const data = await prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
    where: {
      highlighted: true,
    },
    include: {
      variants: true,
      images: {
        orderBy: {
          id: "asc",
        },
      },
    },
  });

  if (!data) {
    return <Loading />;
  }

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
        {data && <ImageSlider data={data} />}
      </div>
    </>
  );
}
