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

//----------------
// const data = formData.getAll("customer");
// if (data) {
// for (let index = 0; index < data.length; index++) {
//   const element = data[index];
//   if (element === "") {
//     return { message: "error!", id: "email", redirect: false };
//   }
// }
// try {
//   const order = await getOrderData();
//   const resp = await fetch("/api/submit", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ data, order }),
//   });
//   console.log(resp);
//   return {
//     message: "goo to go",
//     id: "email",
//     redirect: resp.redirected ? resp.url : false,
//   };
//   // return resp;
// } catch (error) {
//   return { message: "error!", id: "email", redirect: false };
// }
// } else {
//   return { message: "error!", redirect: false };
// }
//----------------

//   const validator = async () => {};
// }

export {
  filterCookieData,
  findKey,
  CustomMetaData,
  CartData,
  frontendValidator,
  validator,
};
