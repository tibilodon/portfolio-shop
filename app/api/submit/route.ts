import { NextResponse, NextRequest } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getAllCookies } from "@/utils/cookieActions";
import { randomUUID } from "crypto";

import {
  validator,
  CartObjectType,
  CustomerDataType,
  orderTemplate,
  fromCookieToDbData,
} from "@/utils/helpers";
import { sendEmail } from "@/utils/sendEmail";
import prisma from "@/prisma/prismaClient";

export async function POST(request: NextRequest) {
  //TODO: set error boundaries

  const dbData = await prisma.product.findMany({
    include: {
      variants: true,
    },
  });

  // const requestUrl = new URL(request.url);
  const data = await request.json();

  const { customerValues, order } = data;

  //  revalidate customer details
  const customer = validator(customerValues);

  if (!customer.length && order) {
    const productsInOrder = fromCookieToDbData(order, dbData);
    //  validate the existence and stock of ordered products

    if (productsInOrder) {
      for (let index = 0; index < productsInOrder.length; index++) {
        const element = productsInOrder[index];
        if (
          element.variants &&
          element.variants.stock < element.selectedAmount
        ) {
          return NextResponse.json({ item: element }, { status: 500 });
        }
        if (!element.variants) {
          if (element.stock < element.selectedAmount) {
            return NextResponse.json({ item: element }, { status: 500 });
          }
        }
      }
    }

    //TODO: include orderNO
    const orderNo = randomUUID();

    // const orderData: CartObjectType[] = data.order;
    // const customerData: CustomerDataType[] = data.customerValues;
    // const test = orderTemplate(orderData);
    // console.log("test", test);
    // await sendEmail(orderData, customerData, String(requestUrl.origin));

    //  in case of a successful submit
    // return NextResponse.redirect(requestUrl.origin, {
    //   status: 301,
    // });

    return NextResponse.json("would be good to go");
  }

  //  redirect after logged in
  // console.log("error @ no formData");
  //   return NextResponse.redirect(requestUrl.origin + "/error", {
  //     status: 301,
  //   });
  return NextResponse.json(" NO   ogo");
}
