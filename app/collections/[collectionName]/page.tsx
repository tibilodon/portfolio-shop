//display items based on category
import styles from "./page.module.css";
import Link from "next/link";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import { findKey } from "@/utils/helpers";
import prisma from "@/prisma/prismaClient";
import Images from "@/components/images/Images";
import Loading from "@/app/loading";
import ProductCard from "@/components/cards/product/ProductCard";
import Image from "next/image";

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
      images: true,
    },
  });

  //if !data return Loading
  if (!data) {
    return <Loading />;
  }

  console.log(data);

  return (
    <>
      <div className={styles.wrap}>
        <h1>collection details</h1>

        {/*product name*/}
        <h1>{keyName}</h1>
        {/*map over data and return each product in a Card*/}
        {data.map((item) => {
          return (
            <span key={item.id}>
              <ProductCard
                description={item.description}
                // image={item.imageUrl}
                productName={item.name}
                variants={item.variants}
                basePrice={item.price}
                baseStock={item.stock}
              />
              {item.images &&
                item.images.map((image) => (
                  <Image
                    key={image.id}
                    src={image.url}
                    width={400}
                    height={400}
                    alt={item.name}
                  />
                ))}
            </span>
          );
        })}
      </div>
    </>
  );
}
