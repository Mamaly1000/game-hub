import React, { ReactNode } from "react";

const CustomForm = ({
  onSubmit,
  children,
}: {
  children: ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) => {
  return (
    <form
      className="min-w-full flex flex-col gap-3 my-5 items-start justify-start p-5 rounded-lg drop-shadow-2xl bg-primary-300"
      onSubmit={onSubmit}
    >
      {children}
    </form>
  );
};

export default CustomForm;
