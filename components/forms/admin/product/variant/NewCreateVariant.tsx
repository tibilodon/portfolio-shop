"use client";
import styles from "./createVariant.module.css";
import { useState } from "react";
type Props = {
  data: {
    id: number;
    createdAt: Date;
    updatedAt: Date | null;
    name: string;
    price: number;
    stock: number;
    productId: number;
  }[];
};

type NewObjType = {
  id: number;
  createdAt: Date;
  updatedAt: Date | null;
  name: string;
  price: number;
  stock: number;
  productId: number;
};
const NewCreateVariant: React.FunctionComponent<Props> = ({ data }) => {
  //copy state, onclick add new object
  const newObj: NewObjType = {
    id: parseInt(String(Math.floor(new Date().getTime() / 1000))),
    createdAt: new Date(),
    updatedAt: null,
    name: "add name",
    price: 0,
    stock: 0,
    productId: 0,
  };
  const [dataState, setDataState] = useState<NewObjType[] | []>(
    data || [newObj]
  );
  const [showInput, setShowInput] = useState(false);

  const addHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setDataState((prevState) => [...prevState, newObj]);
  };

  const removeHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: number
  ) => {
    e.preventDefault();
    setDataState((prevState) => prevState.filter((item) => item.id !== id));
  };
  // name, price, stock
  return (
    <>
      <div>
        {dataState.length <= 2 ? (
          <button onClick={(e) => addHandler(e)}>Add variant</button>
        ) : null}

        {dataState.map((item, i) => {
          const { id, name, price, stock } = item;
          //  add arbitrary number for ease of upsert

          return (
            <span className={styles.wrap} key={i}>
              <button onClick={(e) => removeHandler(e, id)}>
                REMOVE variant
              </button>
              <label htmlFor={`var__${id}__name`}>variant name</label>
              <input
                type="text"
                id={`var__${id}__name`}
                name={`var__${id}__name`}
                defaultValue={name}
                required
              />
              <label htmlFor={`var__${id}__price`}>variant price</label>
              <input
                type="number"
                id={`var__${id}__price`}
                name={`var__${id}__price`}
                defaultValue={price}
                required
              />
              <label htmlFor={`var__${id}__stock`}>variant stock</label>
              <input
                type="number"
                id={`var__${id}__stock`}
                name={`var__${id}__stock`}
                defaultValue={stock}
                required
              />
            </span>
          );
        })}
      </div>
    </>
  );
};

export default NewCreateVariant;
