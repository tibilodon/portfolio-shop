import styles from "./page.module.css";
import Image from "next/image";

export default function Test() {
  const mockCustomer = [
    { email: "tibilodon@gmail.com" },
    { firstName: "Tibor" },
    { lastName: "Vigh" },
    { zip: "5471" },
    { city: "Tiszakürt" },
    { address: "Béke út 20" },
    { phone: "123" },
  ];

  const mockOrder = [
    {
      id: 1,
      stock: 3,
      desc: "this is some desc for the item",
      img: "/static/cart.svg",
      variant_1: "variant_1",
      variant_2: "variant_2",
      product: "targ comp bow 1",
      selectedAmount: 1,
      selectedVariant: "variant_1",
    },
    {
      id: 2,
      stock: 4,
      desc: "this is some desc for the item",
      img: "",
      variant_1: "variant_1",
      variant_2: "variant_2",
      product: "targ comp bow 2",
      selectedAmount: 1,
      selectedVariant: "variant_2",
    },
  ];

  //  merge data into [{}]
  let mergedCustomer = {};
  mockCustomer.forEach((obj) => {
    mergedCustomer = { ...mergedCustomer, ...obj };
  });

  const customerComp = () => {};

  return (
    <>
      <div>
        <head>{/* <title>Order from: {mockCustomer.firstName}</title> */}</head>
      </div>
    </>
  );
}
