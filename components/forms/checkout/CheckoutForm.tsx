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
  // message: "",
  // id: [""],
  message: [{ message: "", id: "" }],
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
  // console.log("here is y", data);
  const router = useRouter();
  const [state, formAction] = useFormState(frontendValidator, initialState);

  // const handler = (id: string) => {
  //   setInvalidState((prevVal) => ({
  //     ...prevVal,
  //     [id]: true,
  //   }));
  // };
  if (state.redirect) {
    //if !false the returned type is string
    router.push(String(state.redirect));
  }

  return (
    <form noValidate action={formAction}>
      <div className={styles.details}>
        <h3>kapcsolattartási adatok</h3>
        <FormFields
          id="email"
          name="email"
          type="email"
          validated={state.message}
        />
        {/* <label htmlFor="email">email</label>
        <input type="email" id="email" name="email" required /> */}

        {/* <p aria-live="polite" role="status">
          {state.id.includes("email") && state?.message}
        </p> */}
      </div>
      <h3>számlázási adatok</h3>
      <div className={styles.details}>
        {/* <label htmlFor="firstName">utónév</label>
        <input type="text" id="firstName" name="firstName" required /> */}
        <FormFields
          id="firstName"
          name="firstName"
          type="text"
          validated={state.message}
        />
        {/* <p aria-live="polite" role="status">
          {state?.message}
        </p> */}

        {/* <label htmlFor="lastName">vezetéknév</label>
        <input type="text" id="lastName" name="customer" required /> */}
        <FormFields
          id="lastName"
          name="lastName"
          type="text"
          validated={state.message}
        />

        {/* <label htmlFor="zip">irányítószám</label>
        <input type="number" id="zip" name="customer" required /> */}
        <FormFields
          id="zip"
          name="zip"
          type="number"
          validated={state.message}
          // pattern={"d{4,4}"}
          maxLength={4}
        />

        {/* <label htmlFor="city">település</label>
        <input type="text" id="city" name="customer" required /> */}
        <FormFields
          id="city"
          name="city"
          type="text"
          validated={state.message}
        />

        {/* <label htmlFor="address">cím</label>
        <input type="text" id="address" name="customer" required /> */}
        <FormFields
          id="address"
          name="address"
          type="text"
          validated={state.message}
        />

        {/* <label htmlFor="phone">telefon</label>
        <input
          type="tel"
          id="phone"
          name="customer"
          required
          // pattern="[0-6]{2}-[0-9]{3}-[0-9]{4}"
        /> */}
        <FormFields
          id="phone"
          name="phone"
          type="number"
          validated={state.message}
        />
      </div>
      <SubmitButton />
      {/* <p aria-live="polite" role="status">
        {state?.message}
      </p> */}
    </form>
  );
};

export default CheckoutForm;
