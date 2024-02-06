"use client";
import styles from "./imageSlider.module.css";
import { useState, useEffect } from "react";

import highLightData from "@/utils/highlights.json";
import { useRouter } from "next/navigation";
import Link from "next/link";
type Props = {
  //   desc: string;
};

const ImageSlider: React.FunctionComponent<Props> = () => {
  const router = useRouter();
  const [bg, setBg] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [freeze, setFreeze] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const currentBg: React.CSSProperties = {
    backgroundImage: `url(${bg})`,
  };
  const images: string[] = [];
  const descs: string[] = [];
  Object.values(highLightData).map((item) => {
    images.push(item.img);
  });
  Object.keys(highLightData).map((prod) => descs.push(prod));

  //TODO:set next | prev btn disabled for the duration of the animation or 1s
  useEffect(() => {
    let value = images.indexOf(bg) + 1;
    if (!freeze) {
      const intervalId = setInterval(() => {
        if (images && images.indexOf(bg) !== images.length - 1) {
          setBg(images[value]);
          setDesc(descs[value]);
        } else {
          setBg(images[0]);
          setDesc(descs[0]);
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
