"use client";
import styles from "./createProductForm.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { createProduct } from "@/utils/actions";
import CreateVariant from "./variant/CreateVariant";

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

        <SubmitButton />

        <p aria-live="polite" role="status">
          {state?.message}
        </p>
      </form>
    </>
  );
};

export default CreateProductForm;
