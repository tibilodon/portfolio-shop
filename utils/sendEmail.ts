import nodemailer from "nodemailer";
import {
  CartObjectType,
  CustomerDataType,
  customerTemplate,
  orderTemplate,
} from "./helpers";
import im from "../static/shop_logo.png";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    //email address
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PW,
  },
});

let tt: string = process.env.EMAIL_USER!;

const sendEmail = async (
  order: CartObjectType[],
  customer: CustomerDataType[],
  url: string
) => {
  try {
    const customerData = customerTemplate(customer);
    const orderData = orderTemplate(order);
    const info = await transporter.sendMail({
      from: {
        name: "TEST",
        address: tt,
      },
      to: [tt],
      subject: "test subj",
      attachments: [
        {
          filename: "shop_logo.png",
          path: url + "/static/shop_logo.png",
          cid: "shop_logo",
        },
      ],

      html: `
  <html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>order</title>
      <style type="text/css">
        body {
width:100%;
          margin: 0;
          background-color: #cccccc;
        }
        table {
          width:100%;
          border-spacing: 0;
        }
        tr {
        border: 1px solid #333
        }
        td {
        
          padding: 0;
        }
        img {
          border: 0;
          width:200px;
        }
        .header{
          background-color: #5e5eda;
          color: #fff;
          padding: 0.3em;
        }
        .banner{
          margin: 0 6em;
        }
      </style>
    </head>
    <body>

    <table class="banner">
    <tr>
    <td>
    <img src="cid:shop_logo" alt="shop logo" />
    </td>
    <td>
    <h1>This is a test</h1>
    </td>
    </tr
    </table>


    ${customerData}

    <table>
    <tr class="header">
    <th>
Termék neve
    </th>
    <th>
    Db
        </th>
    <th>
Egységár
    </th>
    <th>
Érték
    </th>
    </tr>

${orderData}

    </table>

    </body>
  </html>
  `,
    });
    console.log("email sent");
  } catch (error) {
    console.log("error", error);
  }

  //  handle data and create email template
  // try {
  //   const info = await transporter.sendMail({
  //     from: {
  //       name: "INCOMING ORDER",
  //       address: tt,
  //     },
  //     to: [tt],
  //     subject: `Incoming order from ${customer.firstName}`,
  //     html: `
  //     <html>
  //     <body style="border: 2px solid black; padding:2em;">
  //     ${html}
  //     <p><b>Üzenet: </b><br>${text}</p>
  //     </body>
  //     </html>`,
  //   });
  //   console.log("Email sent:", info);
  // } catch (error) {
  //   console.error("Error sending email:", error);
  // }
};
export default sendEmail;
