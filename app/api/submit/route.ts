import { NextResponse, NextRequest } from "next/server";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { getAllCookies } from "@/utils/cookieActions";
import {
  validator,
  CartObjectType,
  CustomerDataType,
  orderTemplate,
} from "@/utils/helpers";
import sendEmail from "@/utils/sendEmail";

export async function POST(request: NextRequest) {
  //TODO: revalidatePath
  //   console.log("body", request);
  const requestUrl = new URL(request.url);
  const data = await request.json();
  // console.log("cookies", cokDa);
  //validate customerValues
  const validateCustomerDetails = validator(data.customerValues);

  if (!validateCustomerDetails.length && data.order) {
    console.log("here is your test data", data.order[0]);
    // const orderData: CartObjectType[] = data.order;
    // const customerData: CustomerDataType[] = data.customerValues;
    // const test = orderTemplate(orderData);
    // console.log("test", test);
    // await sendEmail(orderData, customerData, String(requestUrl.origin));
    //  redirect after logged in
    return NextResponse.redirect(requestUrl.origin, {
      status: 301,
    });
    // return NextResponse.json("ogo");
  }

  //  redirect after logged in
  console.log("error @ no formData");
  //   return NextResponse.redirect(requestUrl.origin + "/error", {
  //     status: 301,
  //   });
  return NextResponse.json(" NO   ogo");
}
