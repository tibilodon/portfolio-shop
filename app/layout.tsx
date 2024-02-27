import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/bars/navbar/Navbar";
import AppContextProvider from "@/utils/context/appContext";
import Wrapper from "@/components/wrapper/Wrapper";
import Sidebar from "@/components/sidebar/Sidebar";
import CartSidebar from "@/components/pages/cart/cartSidebar/CartSidebar";
import { getCookie, getAllCookies } from "@/utils/cookieActions";
import CookieBar from "@/components/bars/cookie/CookieBar";
import { CustomMetaData } from "@/utils/helpers";
import prisma from "@/prisma/prismaClient";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });
export const metadata = new CustomMetaData("Shop Title", "Shop Description");

const getCookieData = async () => {
  const data = await getAllCookies();

  if (data?.length) {
    const newData = [];
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if (element.name !== "tnc") {
        newData.push(element);
      }
    }
    return newData;
  }
  return;
};

const getDbData = async () => {
  try {
    const res = await prisma.product.findMany({
      include: {
        variants: true,
      },
    });
    if (res) {
      return res;
    } else {
      redirect("/error");
    }
  } catch (error) {
    redirect("/error");
  }
};

const getCategories = async () => {
  try {
    const res = await prisma.category.findMany({
      orderBy: {
        id: "asc",
      },
      include: {
        parent: true,
        subcategories: {
          include: {
            subcategories: true,
          },
        },
      },
    });

    if (res) {
      return res;
    } else {
      redirect("/error");
    }
  } catch (error) {
    redirect("/error");
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const data = await getCookieData();
  // const prismaData = await getDbData();
  // const categories = await getCategories();

  const [data, prismaData, categories, tnc] = await Promise.all([
    getCookieData(),
    getDbData(),
    getCategories(),
    getCookie("tnc"),
  ]);

  // if (!prismaData || !categories) {
  //   redirect("/admin");
  // }

  //  check right before every page load -- page is getting cached, in that way cannot read out headers before every page "load"
  // const tnc = await getCookie("tnc");

  return (
    <html lang="en">
      <body className={inter.className}>
        {prismaData ? (
          <section>
            <AppContextProvider>
              <Navbar />
              <Sidebar categories={categories} />
              <CartSidebar data={data} prismaData={prismaData} />
              <div className="children">
                <Wrapper>{children}</Wrapper>
              </div>
              {tnc?.value !== "1" ? <CookieBar /> : null}
            </AppContextProvider>
          </section>
        ) : (
          <Loading />
        )}
      </body>
    </html>
  );
}
