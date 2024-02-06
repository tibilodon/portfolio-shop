import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/bars/navbar/Navbar";
import AppContextProvider from "@/utils/context/appContext";
import Wrapper from "@/components/wrapper/Wrapper";
import Sidebar from "@/components/sidebar/Sidebar";
import CartSidebar from "@/components/pages/cart/cartSidebar/CartSidebar";
import { getCookie, getAllCookies } from "@/utils/cookieActions";
import CookieBar from "@/components/bars/cookie/CookieBar";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nyílműhely",
  description: "Archery themed test shop",
};

const getData = async () => {
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await getData();

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Navbar />
          <Sidebar />
          <CartSidebar data={data} />
          <div className="children">
            <Wrapper>{children}</Wrapper>
          </div>
          <CookieBar />
        </AppContextProvider>
      </body>
    </html>
  );
}
