"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/utils/cookieActions";

type Props = { product: string };

const TestDel: React.FunctionComponent<Props> = ({ product }) => {
  const router = useRouter();
  const test = () => {
    deleteCookie(product);
    router.refresh();
  };
  return <button onClick={test}>TestDel</button>;
};

export default TestDel;
