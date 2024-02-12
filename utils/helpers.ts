import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import dataSet from "@/utils/dataset.json";

//separate cookie.value to product and variant
const filterCookieData = (data: string) => {
  // const testStr = "some product name__variant_2";
  const regexPattern = /([^_]+)__(.+)/;

  if (data) {
    const matchResult = regexPattern.exec(data);
    // const tes = regexPattern2.exec(testStr);

    if (matchResult) {
      const res: { product: string; variant: string } = {
        product: matchResult[1],
        variant: matchResult[2],
      };
      return res;
    } else {
      console.log("No match found");
    }
  }
};

//  finds corresponding object based on key
const findKey = (obj: any, targetKey: string) => {
  if (obj && typeof obj === "object") {
    if (targetKey in obj) {
      return obj[targetKey];
    }
    for (const key in obj) {
      const result: any = findKey(obj[key], targetKey);
      if (result !== undefined) {
        return result;
      }
    }
  }
  return undefined;
};

import { Metadata } from "next";

interface Image {
  url: string;
  width: number;
  height: number;
}

class CustomMetaData implements Metadata {
  title: string;
  description: string;
  metadataBase: URL;
  openGraph: {
    title: string;
    description: string;
    images: Image[];
  };

  constructor(title: string, description: string) {
    const testUrl = "http://localhost:3000";
    const ogHostUrl: string = testUrl + "/api/og";

    this.title = title;
    this.description = description;
    this.metadataBase = new URL(ogHostUrl);
    this.openGraph = {
      title: title,
      description: description,
      images: [
        {
          url: ogHostUrl,
          width: 1200,
          height: 630,
        },
      ],
    };
  }
}

export type CartObjectType = {
  id: number;
  stock: number;
  desc: string;
  img: string;
  variant_1: string;
  variant_2: string;
  product: string;
  selectedAmount: number;
  selectedVariant: string;
  price: number;
  calcPrice: number;
};
class CartData {
  protected cartData: CartObjectType[];
  constructor(data: RequestCookie[] | undefined) {
    this.cartData = [];
    if (data?.length) {
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        if (element.name !== "tnc") {
          const separate = filterCookieData(element.name);

          if (separate) {
            let oriData = findKey(dataSet, separate.product);
            if (oriData) {
              let modData = { ...oriData };
              modData.product = separate.product;
              modData.selectedAmount = Number(element.value);
              modData.selectedVariant = separate.variant;
              modData.calcPrice = Number(element.value) * Number(oriData.price);
              this.cartData.push(modData);
            }
          }
        }
      }
    }
  }
  getCartData() {
    return this.cartData;
  }
}

//--------------------------
import { getAllCookies, deleteCookie } from "@/utils/cookieActions";

//  async class cannot be created
const getOrderData = async () => {
  const data: RequestCookie[] | undefined = await getAllCookies();
  const cartDataInstance = new CartData(data);
  const cartData = cartDataInstance.getCartData();
  return cartData;
};

const errorMsg = (key: string): string => {
  let message: string = "";
  switch (key) {
    case "email":
      message = "Please enter a valid e-mail address";
      break;
    // case "!email":
    //   message = "Must contain @";
    //   break;
    case "zip":
      message = "must be 4 digits only";
      break;

    default:
      message = "Field is required";
      break;
  }
  return message;
};

const validator = (customerValues: any): ValidatedType[] => {
  const invalids: ValidatedType[] = [];
  for (let index = 0; index < customerValues.length; index++) {
    const element = customerValues[index];
    //  iterate through formData objects and its values
    for (const key in element) {
      if (Object.prototype.hasOwnProperty.call(element, key)) {
        const val = String(element[key]);
        const validatedObj: ValidatedType = { message: "", id: "" };
        //empty validation
        if (!val) {
          //TODO: create class for this
          validatedObj.message = errorMsg(key);
          validatedObj.id = key;
          invalids.push(validatedObj);
        }

        //  email
        if (val && key === "email") {
          //  convert FormDataEntryValue to string for ease of use
          // const stringVal = String(val);
          const conditions = ["@", "."];
          if (conditions.some((el) => !val.includes(el))) {
            validatedObj.message = errorMsg(key);
            validatedObj.id = key;
            invalids.push(validatedObj);
          }
        }
        if (val && key === "zip") {
          if (val.length > 4) {
            validatedObj.message = errorMsg(key);
            validatedObj.id = key;
            invalids.push(validatedObj);
          }
        }
      }
    }
  }
  return invalids;
};
//--------------------------

//frontend validation for right error msgs

export type ValidatedType = {
  message: string;
  id: string;
};

export type CustomerDataType = {
  email: string;
  firstName: string;
  lastName: string;
  zip: string;
  city: string;
  address: string;
  phone: string;
};

async function frontendValidator(
  prevState: {
    message: ValidatedType[];
    redirect: boolean | string;
  },
  formData: FormData
) {
  //TODO: export
  //  declare form ids
  const ids = [
    "email",
    "firstName",
    "lastName",
    "zip",
    "city",
    "address",
    "phone",
  ];

  //  define array to hold customer data
  const customerValues = [];
  //  iterate through every formData based on the ids array and push results to the customerValues array, (if empty throw error)

  for (let index = 0; index < ids.length; index++) {
    const element = ids[index];
    const obj = {
      [element]: formData.get(element),
    };
    customerValues.push(obj);
  }

  //  iterate through every element in the form and validate accordingly
  //  return error messages if any

  //  error messages

  //  validatorl logic
  const invalids = validator(customerValues);
  // const invalids: ValidatedType[] = [];
  // for (let index = 0; index < customerValues.length; index++) {
  //   const element = customerValues[index];
  //   //  iterate through formData objects and its values
  //   for (const key in element) {
  //     if (Object.prototype.hasOwnProperty.call(element, key)) {
  //       const val = String(element[key]);
  //       const validatedObj: ValidatedType = { message: "", id: "" };
  //       //empty validation
  //       if (!val) {
  //         //TODO: create class for this
  //         validatedObj.message = errorMsg(key);
  //         validatedObj.id = key;
  //         invalids.push(validatedObj);
  //       }

  //       //  email
  //       if (val && key === "email") {
  //         //  convert FormDataEntryValue to string for ease of use
  //         // const stringVal = String(val);
  //         const conditions = ["@", "."];
  //         if (conditions.some((el) => !val.includes(el))) {
  //           validatedObj.message = errorMsg(key);
  //           validatedObj.id = key;
  //           invalids.push(validatedObj);
  //         }
  //       }
  //       if (val && key === "zip") {
  //         if (val.length > 4) {
  //           validatedObj.message = errorMsg(key);
  //           validatedObj.id = key;
  //           invalids.push(validatedObj);
  //         }
  //       }
  //     }
  //   }
  // }

  //  data validated
  const order = await getOrderData();
  if (!invalids.length && order.length) {
    try {
      const resp = await fetch("/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ customerValues, order }),
      });
      if (resp.ok) {
        return {
          message: invalids,

          redirect: resp.redirected ? resp.url : false,
        };
      }
      // return resp;
    } catch (error) {
      return { message: invalids, redirect: false };
    }
  }

  // const email = String(formData.get("email"));
  // const firstName = String(formData.get("firstName"));

  // console.log("test val---", invalids);
  return {
    // message: "error! please fill out the field",
    // id: ["email"],
    message: invalids,
    redirect: false,
  };
}

import { randomUUID } from "crypto";

const dateParser = () => {
  // Timestamp in milliseconds
  const timestamp = 1707649583119;

  // Convert timestamp to Date object
  const date = new Date(timestamp);

  // Extract year, month, day, hours, minutes, and seconds
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  // Construct the formatted date string
  const formattedDate = `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
};

const customerTemplate = (customerData: CustomerDataType[]) => {
  const orderNo = randomUUID();
  //  merge data into {} for ease of use
  let mergedCustomer: any = {};
  customerData.forEach((obj) => {
    mergedCustomer = { ...mergedCustomer, ...obj };
  });

  const { email, firstName, lastName, zip, city, address, phone } =
    mergedCustomer;
  // <head style="background-color: #5e5eda">
  // <title>Megrendelés adatai</title>
  // </head>
  let customer: string = `<table>
<tr class="header">
<th >
Megrendelés adatai:

</th>
</tr>
    <tr>
   
    
    <th>Megrendelés sorszáma:</th>
    <td>${orderNo}</td>

    </tr>
    
    <tr>
   
    <th>Megrendelés időpontja:</th>
    <td>${dateParser()}</td>

    </tr>

    
    <tr>
   
    <th>Megrendelő:</th>
    <td>${lastName} ${firstName}, ${zip}, ${city}, ${address}, (${phone})</td>

    </tr>

    <tr>
   
    
    <th>E-mail cím:</th>
    <td>${email}</td>

    </tr>

    <tr>
   
    
    <th>Számlázási adatok:</th>
    <td>${lastName} ${firstName}, ${zip}, ${city}, ${address}</td>

    </tr>

    </table>`;
  return customer;
};

const orderTemplate = (orderData: CartObjectType[]): string => {
  let resString = "";
  for (let index = 0; index < orderData.length; index++) {
    //tr-->td
    //prod name, amount, price, calc price
    const obj = orderData[index];
    const { product, selectedVariant, selectedAmount, price, calcPrice } = obj;
    let str = `<tr>
    <td>
    ${product} - ${selectedVariant}
    </td>
    <td>
${selectedAmount}
    </td>
    <td>
${price}
    </td>
    <td>
${calcPrice}
    </td>
    </tr>`;
    resString += str;
  }

  return resString;
};

export {
  filterCookieData,
  findKey,
  CustomMetaData,
  CartData,
  frontendValidator,
  validator,
  customerTemplate,
  orderTemplate,
};
