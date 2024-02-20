"use client";
//  could take in id from parent, if any
import { useFormState, useFormStatus } from "react-dom";
import createCategory from "@/utils/actions";
import { usePathname } from "next/navigation";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}
type Props = {
  parentId?: number;
  label: string;
};
const CategoryForm: React.FunctionComponent<Props> = ({ parentId, label }) => {
  const pathname = usePathname();
  const initialState = {
    message: "",
    pathname: pathname,
    parentId: parentId ? parentId : 0,
  };
  // initialState.pathname = pathname;
  // if (parentId) {
  //   initialState.parentId = parentId;
  // }
  const [state, formAction] = useFormState(createCategory, initialState);

  return (
    <form action={formAction}>
      <label htmlFor="name">{label}</label>
      <input type="text" id="name" name="name" required />
      {/* <label htmlFor="parentId">parentId</label>
      <input type="number" id="parentId" name="parentId" required /> */}
      <SubmitButton />
      <p aria-live="polite" role="status">
        {state?.message}
      </p>
    </form>
  );
};
export default CategoryForm;
