"use client";
import styles from "./upsertImage.module.css";
import { useState, useRef } from "react";
import Image from "next/image";

type ImageType = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  url: string | Blob | MediaSource;
  productId: number;
};

type Props = { images: ImageType[]; id: number };

const UpsertImage: React.FunctionComponent<Props> = ({ images, id }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<FileList | null>(null);
  const [fileCounter, setFileCounter] = useState(images.length);

  const newObj: ImageType = {
    id: parseInt(String(Math.floor(new Date().getTime() / 1000))),
    createdAt: new Date(),
    updatedAt: null,
    url: "",
    productId: id,
  };
  const [dataState, setDataState] = useState<ImageType[] | []>(
    images || [newObj]
  );

  const addHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (ref.current) {
      ref.current.click();
    }
  };

  const removeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    setDataState((prevState) => prevState.filter((item) => item.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log("fired");
    if (e.currentTarget.files) {
      const selectedFile = e.currentTarget.files[0];
      const fileObj: ImageType = {
        id: parseInt(String(Math.floor(new Date().getTime() / 1000))),
        createdAt: new Date(),
        updatedAt: null,
        url: selectedFile,
        productId: id,
      };
      setDataState((prevState) => [...prevState, fileObj]);
      // Do something with the selected file
      // console.log("Selected file:", selectedFile);
    }
  };

  console.log("dataState", dataState);

  return (
    <>
      <div className={styles.wrap}>
        {/* <input
          type="file"
          ref={ref}
          style={{ display: "none" }}
          onChange={handleFileChange}
        /> */}
        <button onClick={addHandler}>Add image</button>

        {dataState.map((item) => {
          const { id, url } = item;
          const currentUrl =
            typeof url === "string" ? url : URL.createObjectURL(url);
          return (
            <span key={id}>
              <Image src={currentUrl} alt="asdasd" width={400} height={400} />
              <input
                type="file"
                name="image"
                id="image"
                ref={ref}
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              <button onClick={(e) => removeHandler(e, id)}>
                remove image
              </button>
            </span>
          );
        })}
      </div>
    </>
  );
};

export default UpsertImage;
