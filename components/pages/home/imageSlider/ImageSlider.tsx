"use client";
import styles from "./imageSlider.module.css";
import { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import { ProductType } from "@/app/page";
import ProductCard from "@/components/cards/product/ProductCard";
import Image from "next/image";

type Props = {
  data: any;
};

const ImageSlider: React.FunctionComponent<Props> = ({ data }) => {
  const [freeze, setFreeze] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [highlightData, setHighlightData] = useState(data[0]);

  //TODO:set next | prev btn disabled for the duration of the animation or 1s

  // create function for local scope variable
  const localValue = (): number => {
    return data.indexOf(highlightData);
  };
  useEffect(() => {
    // let value = images.indexOf(bg) + 1;
    let value = localValue() + 1;
    if (!freeze) {
      const intervalId = setInterval(() => {
        if (data && localValue() !== data.length - 1) {
          setHighlightData(data[value]);
        } else {
          setHighlightData(data[0]);
        }
      }, 3000);
      // Clean up the interval when the component unmounts or when a dependency changes
      return () => clearInterval(intervalId);
    }
  }); // Adjust dependencies as needed

  const nextHandler = () => {
    setFreeze(true);
    if (!isDisabled) {
      setIsDisabled(true);
    }

    let value = localValue() + 1;
    if (data && localValue() !== data.length - 1) {
      setHighlightData(data[value]);
    } else {
      setHighlightData(data[0]);
    }
  };

  const prevHandler = () => {
    setFreeze(true);
    if (!isDisabled) {
      setIsDisabled(true);
    }

    let value = localValue() - 1;
    if (data && localValue() !== 0) {
      setHighlightData(data[value]);
    } else {
      // If at the beginning, set the last item
      setHighlightData(data[data.length - 1]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsDisabled(false);
    }, 3000);
  }, [isDisabled]);

  const { name, description, variants, price, stock, images } = highlightData;
  return (
    <>
      {data && (
        <div className={styles.wrap}>
          <ProductCard
            description={description}
            // image={imageUrl}
            productName={name}
            variants={variants}
            basePrice={price}
            baseStock={stock}
          />
          {images && (
            <Image
              alt="first image"
              src={images[0].url}
              width={400}
              height={400}
            />
          )}

          <button disabled={isDisabled} onClick={nextHandler}>
            next
          </button>
          <button disabled={isDisabled} onClick={prevHandler}>
            prev
          </button>
        </div>
      )}
    </>
  );
};

export default ImageSlider;
