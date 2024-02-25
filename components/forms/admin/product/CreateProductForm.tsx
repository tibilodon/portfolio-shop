"use client";
import styles from "./createProductForm.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { createProduct } from "@/utils/actions";
import CreateVariant from "./variant/CreateVariant";
import { useState } from "react";
import Image from "next/image";
import AddImage from "./image/AddImage";
// save and quit - formAction on button - > redirect upon successful submit
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

//  extract type
type Props = {
  categories: ({
    subcategories: ({
      subcategories: {
        id: number;
        createdAt: Date;
        updatedAt: Date | null;
        name: string;
        parentId: number | null;
      }[];
    } & {
      id: number;
      createdAt: Date;
      updatedAt: Date | null;
      name: string;
      parentId: number | null;
    })[];
  } & {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    name: string;
    parentId: number | null;
  })[];
};

const CreateProductForm: React.FunctionComponent<Props> = ({ categories }) => {
  const initialState = {
    message: "",
  };

  const [state, formAction] = useFormState(createProduct, initialState);
  const [img, setImg] = useState<File | null>(null);

  const handler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.currentTarget.files) {
      const file = e.currentTarget.files[0];
      setImg(file);
    }
  };
  return (
    <>
      <form className={styles.form} action={formAction}>
        <label htmlFor="name">name</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="description">description</label>
        <input type="text" id="description" name="description" required />

        <label htmlFor="price">price</label>
        <input type="number" id="price" name="price" required />

        <label htmlFor="stock">stock</label>
        <input type="number" id="stock" name="stock" required />

        <label htmlFor="highlighted">highlighted</label>
        <select name="highlighted" id="highlighted">
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <label htmlFor="category">category</label>
        <select name="category" id="category">
          {categories.map((items) => {
            const { id, name } = items;
            return (
              <option key={id} value={name}>
                {name}
              </option>
            );
          })}
        </select>

        <CreateVariant />

        {/* <span>
          <label style={{ backgroundColor: "red" }} htmlFor="image">
            Kép csere
          </label>
          <input
            id="image"
            name="image"
            style={{ display: "none" }}
            type="file"
            onChange={handler}
          />
        </span> */}

        {/* {img && (
          <Image
            src={URL.createObjectURL(img)}
            width={340}
            height={340}
            alt="test img"
          />
        )} */}
        <AddImage />
        <SubmitButton />

        <p aria-live="polite" role="status">
          {state?.message}
        </p>
      </form>
    </>
  );
};

export default CreateProductForm;
