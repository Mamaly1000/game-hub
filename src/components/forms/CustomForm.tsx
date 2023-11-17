import React, { ReactNode } from "react";
import Custom_Button from "../inputs/Custom_Button";
import RTL_Creator from "../ui/RTL_Creator";

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
    <RTL_Creator>
      <form
        className="min-w-full flex flex-col gap-3 my-5 items-start justify-start p-5 rounded-lg drop-shadow-2xl bg-primary-300"
        onSubmit={onSubmit}
      >
        {children}
        <div className=" min-w-full flex items-center justify-center gap-4 flex-wrap">
          <Custom_Button
            btn_type="submit"
            className="px-3 py-2 rounded-lg drop-shadow-2xl bg-success"
            text={submitText}
            type="primary"
          />{" "}
          <Custom_Button
            btn_type="reset"
            className="px-3 py-2 rounded-lg drop-shadow-2xl bg-error"
            onclick={onReset}
            text={resetText}
            type="error"
          />
          {additionalButtons}
        </div>
      </form>
    </RTL_Creator>
  );
};

export default CustomForm;
