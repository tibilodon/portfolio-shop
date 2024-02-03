import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/bars/navbar/Navbar";
import AppContextProvider from "@/utils/context/appContext";
import Wrapper from "@/components/wrapper/Wrapper";
import Sidebar from "@/components/sidebar/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nyílműhely",
  description: "Archery themed test shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <Navbar />
          <Sidebar />
          <div className="children">
            <Wrapper>{children}</Wrapper>
          </div>
        </AppContextProvider>
      </body>
    </html>
  );
}
