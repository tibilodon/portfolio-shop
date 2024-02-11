import { randomUUID } from "crypto";
import styles from "./page.module.css";
import Image from "next/image";
import { CustomerDataType } from "@/utils/helpers";

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
  console.log(Date.now());
  const customerComp = () => {
    const orderNo = randomUUID();
    //  merge data into {} for ease of use
    let mergedCustomer: any = {};
    mockCustomer.forEach((obj) => {
      mergedCustomer = { ...mergedCustomer, ...obj };
    });

    if (mergedCustomer) {
      const { email, firstName, lastName, zip, city, address, phone } =
        mergedCustomer;
      let customer: string = `<div style="display: flex; flexDirection: column">
      <head style="backgroundColor: #5e5eda">
      <title>Megrendelés adatai</title>
      </head>
      <span>
      <strong>Megrendelés sorszáma:</strong>
      <p>${orderNo}</p>
      </span>
      <span>
      <strong>Megrendelés időpontja:</strong>
      <p>${Date.now().toLocaleString()}</p>
      </span>
      <span>
      <strong>Megrendelő:</strong>
      <p>${lastName} ${firstName}</p></br>
      <p>${zip}, ${city}, ${address}, (${phone})</p>
      </span>

      <span>
      <strong>E-mail cím:</strong>
      <p>${email}</p>
      </span>

      <span>
      <strong>Számlázási adatok:</strong>
      <p>${lastName} ${firstName}</p></br>
      <p>${zip}, ${city}, ${address}</p>
      </span>

      </div>`;
    }
  };

  return (
    <>
      <div>
        <h1>test</h1>
      </div>
    </>
  );
}
