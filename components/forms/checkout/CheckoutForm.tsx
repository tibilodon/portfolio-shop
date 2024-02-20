"use client";
import styles from "./checkoutForm.module.css";
import { useFormState, useFormStatus } from "react-dom";
import { useState } from "react";
import { CartObjectType, frontendValidator } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { ValidatedType } from "@/utils/helpers";
import FormFields from "@/components/fields/FormFields";
import { Dispatch, SetStateAction } from "react";

type Props = {};

const initialState = {
  //  form field
  message: [{ message: "", id: "" }],
  //  order - db
  error: { item: "", cause: "" },
  //  if submit is successful
  redirect: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" aria-disabled={pending}>
      Add
    </button>
  );
}

const CheckoutForm: React.FunctionComponent<Props> = () => {
  const router = useRouter();
  const [state, formAction] = useFormState(frontendValidator, initialState);

  if (state.redirect) {
    //if !false the returned type is string
    router.push(String(state.redirect));
  }

  return (
    <>
      <form noValidate action={formAction}>
        <div className={styles.details}>
          {state.error.cause && (
            <div aria-live="polite" role="status">
              <h4>
                error!: {state.error.item} {state.error.cause}
              </h4>
            </div>
          )}
          <h3>kapcsolattartási adatok</h3>
          <FormFields
            id="email"
            name="email"
            type="email"
            validated={state.message}
          />
        </div>
        <h3>számlázási adatok</h3>
        <div className={styles.details}>
          <FormFields
            id="firstName"
            name="firstName"
            type="text"
            validated={state.message}
          />
          <FormFields
            id="lastName"
            name="lastName"
            type="text"
            validated={state.message}
          />
          <FormFields
            id="zip"
            name="zip"
            type="number"
            validated={state.message}
            // pattern={"d{4,4}"}
            maxLength={4}
          />
          <FormFields
            id="city"
            name="city"
            type="text"
            validated={state.message}
          />
          <FormFields
            id="address"
            name="address"
            type="text"
            validated={state.message}
          />
          <FormFields
            id="phone"
            name="phone"
            type="number"
            validated={state.message}
          />
        </div>
        <SubmitButton />
      </form>
    </>
  );
};

export default CheckoutForm;
