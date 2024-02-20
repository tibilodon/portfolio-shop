//display items based on category
import styles from "./page.module.css";
import Link from "next/link";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import { findKey } from "@/utils/helpers";
import prisma from "@/prisma/prismaClient";
import Images from "@/components/images/Images";
import Loading from "@/app/loading";
import ProductCard from "@/components/cards/product/ProductCard";

export default async function CollectionDetails({
  params,
}: {
  params: { collectionName: string };
}) {
  const keyName = params.collectionName
    .replace(/%20/g, " ")
    .replace(/%26/g, "&");

  //fetch data from db
  const data = await prisma.product.findMany({
    where: {
      categoryId: keyName,
    },
    include: {
      variants: true,
    },
  });

  //if !data return Loading
  if (!data) {
    return <Loading />;
  }

  return (
    <>
      <div className={styles.wrap}>
        <h1>collection details</h1>

        {/*product name*/}
        <h1>{keyName}</h1>
        {/*map over data and return each product in a Card*/}
        {data.map((item) => {
          return (
            <ProductCard
              key={item.id}
              description={item.description}
              // image={item.imageUrl}
              productName={item.name}
              variants={item.variants}
              basePrice={item.price}
              baseStock={item.stock}
            />
          );
        })}
      </div>
    </>
  );
}
