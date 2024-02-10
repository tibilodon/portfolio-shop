"use client";
import { useRouter } from "next/navigation";
import { useAppProvider } from "@/utils/context/appContext";

type Props = {};

const TestButton = (props: Props) => {
  const router = useRouter();
  const handler = () => {
    console.log("great");
    router.push("/checkout");
  };
  // const { setCartItems } = useAppProvider();
  return (
    <>
      <button onClick={handler}>good on ya</button>
    </>
  );
};

export default TestButton;
