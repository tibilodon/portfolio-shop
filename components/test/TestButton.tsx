"use client";
import { useAppProvider } from "@/utils/context/appContext";

type Props = {};

const TestButton = (props: Props) => {
  const { setCartItems } = useAppProvider();
  return (
    <>
      <button onClick={() => setCartItems(12)}>set cart</button>
      <button onClick={() => setCartItems(0)}>reset</button>
    </>
  );
};

export default TestButton;
