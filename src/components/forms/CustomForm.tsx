import React, { ReactNode } from "react";
import Custom_Button from "../inputs/Custom_Button";

const CustomForm = ({
  onSubmit,
  children,
  onReset,
  resetText,
  submitText,
  additionalButtons,
}: {
  additionalButtons?: ReactNode;
  resetText: string;
  submitText: string;
  onReset: (e?: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      className="min-w-full flex flex-col gap-3 my-5 items-start justify-start p-5 text-white rounded-lg drop-shadow-2xl bg-secondary-800"
      onSubmit={onSubmit}
    >
      {children}
      <div className=" min-w-full flex items-center justify-center gap-4 flex-wrap">
        <Custom_Button
          btn_type="submit"
          className="px-3 py-2 rounded-lg drop-shadow-2xl  "
          background="rgba(var(--color-success), var(--tw-bg-opacity))"
        >
          {submitText}
        </Custom_Button>
        <Custom_Button
          btn_type="reset"
          className="px-3 py-2 rounded-lg drop-shadow-2xl bg-error"
          onclick={onReset}
          background="rgba(var(--color-error), var(--tw-bg-opacity))"
        >
          {resetText}
        </Custom_Button>
        {additionalButtons}
      </div>
    </form>
  );
};

export default CustomForm;
