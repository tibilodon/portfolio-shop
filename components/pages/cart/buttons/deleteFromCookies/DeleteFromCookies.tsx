"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "@/utils/cookieActions";

type Props = { product: string; label: string };

const DeleteFromCookies: React.FunctionComponent<Props> = ({
  product,
  label,
}) => {
  const router = useRouter();
  const handler = () => {
    deleteCookie(product);
    router.refresh();
  };
  return (
    <>
      <button onClick={handler}>{label}</button>
    </>
  );
};

export default DeleteFromCookies;
