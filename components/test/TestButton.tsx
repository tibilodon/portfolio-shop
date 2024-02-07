"use client";
import { useAppProvider } from "@/utils/context/appContext";

type Props = {};

const TestButton = (props: Props) => {
  const handler = () => {
    throw new Error("error");
  };
  // const { setCartItems } = useAppProvider();
  return (
    <>
      <button onClick={handler}>good on ya</button>
    </>
  );
};

export default TestButton;
