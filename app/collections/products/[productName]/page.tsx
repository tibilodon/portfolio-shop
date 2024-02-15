import styles from "./page.module.css";
import data from "@/utils/dataset.json";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
import { findKey } from "@/utils/helpers";
import Images from "@/components/images/Images";
import prisma from "@/prisma/prismaClient";
import ProductCard from "@/components/cards/product/ProductCard";
import Loading from "@/app/loading";
import { redirect } from "next/navigation";

export default async function ProductDetails({
  params,
}: {
  params: { productName: string };
}) {
  const keyName = params.productName.replace(/%20/g, " ").replace(/%26/g, "&");

  let dataRes;
  try {
    dataRes = await prisma.product.findMany({
      where: {
        name: keyName,
      },
      include: {
        variants: true,
      },
    });
  } catch (error) {
    redirect("/error");
  }

  if (!dataRes.length) {
    return <Loading />;
  }
  const { name, price, stock, variants, imageUrl, description } = dataRes[0];
  const data = dataRes[0];
  console.log("the prod data:", data);
  // const pageData = findKey(data, keyName);

  return (
    <>
      {/* <h1>product details</h1>
      <h1>{keyName}</h1>
      {[pageData].map((item: any, i: number) => {
        return (
          <span key={i}>
            <p>{item.id}</p>
            <p>{item.stock}</p>
            <p>{item.desc}</p>

            <Images image={item.img} alt={item} />
            <AddToCartBtn
              productName={keyName}
              stock={item.stock}
              variant_1={item.variant_1}
              variant_2={item.variant_2}
            />
          </span>
        );
      })} */}
      <div className={styles.wrap}>
        <h1>product details</h1>
        <h1>{keyName}</h1>
        {data && (
          <ProductCard
            basePrice={price}
            baseStock={stock}
            description={description}
            image={imageUrl}
            productName={name}
            variants={variants}
          />
        )}
      </div>
    </>
  );
}
