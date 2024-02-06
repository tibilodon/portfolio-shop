"use client";
import styles from "./imageSlider.module.css";
import { useState, useEffect } from "react";

import highLightData from "@/utils/highlights.json";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AddToCartBtn from "@/components/buttons/navigate/addToCart/AddToCartBtn";
type Props = {
  //   desc: string;
};

const ImageSlider: React.FunctionComponent<Props> = () => {
  const router = useRouter();

  const amountData: number[] = [];
  const variantData: string[] = [];
  const variantData_2: string[] = [];

  const images: string[] = [];
  const descs: string[] = [];
  Object.values(highLightData).map((item: any) => {
    images.push(item.img);
    amountData.push(Number(item.stock));
    variantData.push(item.variant_1);
    variantData_2.push(item.variant_2);
  });
  Object.keys(highLightData).map((prod) => descs.push(prod));
  const [bg, setBg] = useState<string>(images[0]);
  const currentBg: React.CSSProperties = {
    backgroundImage: `url(${bg})`,
  };
  const [desc, setDesc] = useState<string>(descs[0]);
  const [freeze, setFreeze] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [amount, setAmount] = useState(amountData[0]);
  const [variant, setVariant] = useState(variantData[0]);
  const [variant_2, setVariant_2] = useState(variantData_2[0]);

  //TODO:set next | prev btn disabled for the duration of the animation or 1s
  useEffect(() => {
    let value = images.indexOf(bg) + 1;
    if (!freeze) {
      const intervalId = setInterval(() => {
        if (images && images.indexOf(bg) !== images.length - 1) {
          setBg(images[value]);
          setDesc(descs[value]);
          setAmount(amountData[value]);
          setVariant(variantData[value]);
          setVariant_2(variantData_2[value]);
        } else {
          setBg(images[0]);
          setDesc(descs[0]);
          setAmount(amountData[0]);
          setVariant(variantData[0]);
          setVariant_2(variantData_2[0]);
        }
      }, 3000);
      // Clean up the interval when the component unmounts or when a dependency changes
      return () => clearInterval(intervalId);
    }
  }); // Adjust dependencies as needed

  const handler = () => {
    setFreeze(true);
    if (!isDisabled) {
      setIsDisabled(true);
    }

    let value = images.indexOf(bg) + 1;
    if (images && images.indexOf(bg) !== images.length - 1) {
      setBg(images[value]);
      setDesc(descs[value]);
    } else {
      setBg(images[0]);
      setDesc(descs[0]);
    }
  };

  const prevHandler = () => {
    setFreeze(true);
    if (!isDisabled) {
      setIsDisabled(true);
    }
    let value = images.indexOf(bg) - 1;

    if (images && images.indexOf(bg) !== 0) {
      setBg(images[value]);
      setDesc(descs[value]);
    } else {
      // If at the beginning, set the last item
      setBg(images[images.length - 1]);
      setDesc(descs[images.length - 1]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  }, [isDisabled]);

  return (
    <>
      <div className={styles.wrap}>
        <Link href={`/collections/products/${desc}`}>
          <div style={currentBg} className={`${styles.modalContent}`}>
            {/* <Image width={200} height={200} src={images[0]} alt="test" /> */}
          </div>
          <h3>{desc}</h3>
        </Link>
        <AddToCartBtn
          productName={desc}
          stock={amount}
          variant_1={variant}
          variant_2={variant_2}
        />

        <button disabled={isDisabled} onClick={handler}>
          next
        </button>
        <button disabled={isDisabled} onClick={prevHandler}>
          prev
        </button>
      </div>
    </>
  );
};

export default ImageSlider;
