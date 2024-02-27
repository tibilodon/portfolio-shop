"use client";
import styles from "./addImage.module.css";
import { useState } from "react";
import Image from "next/image";
type Props = {};

const AddImage: React.FunctionComponent<Props> = () => {
  const [file, setFile] = useState<FileList>();
  const [showInput, setShowInput] = useState(false);
  const [imageCount, setImageCount] = useState<number>(0);

  const imageHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    // !showInput && setShowInput(true);
    // setImageCount((prevCount) => prevCount + 1);

    if (e.currentTarget.files) {
      //   const file = e.currentTarget.files[0];
      //   setFile((prevFiles) => [...prevFiles, file]);
      const file = e.currentTarget.files;
      setFile(file);
    }
    //multiple images
  };

  //   const addHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
  //     e.preventDefault();
  //     !showInput && setShowInput(true);
  //     setImageCount((prevCount) => prevCount + 1);
  //   };
  //   console.log(file);
  return (
    <>
      <div className={styles.wrap}>
        <span>
          <label htmlFor={`image`}>add images</label>
          <input
            style={{ display: "none" }}
            type="file"
            id={`image`}
            name={`image`}
            onChange={imageHandler}
            multiple
          />
        </span>
        {file &&
          Array.from(file).map((item, i: number) => {
            return (
              <Image
                key={i}
                width={400}
                height={400}
                src={URL.createObjectURL(item)}
                alt="image"
              />
            );
          })}
      </div>
    </>
  );
};

export default AddImage;
