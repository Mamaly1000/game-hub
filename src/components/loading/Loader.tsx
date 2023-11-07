import React from "react";
import { ClockLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-w-full min-h-[400px] flex items-center justify-center">
      <ClockLoader color="rgb(var(--color-primary-900))" />
    </div>
  );
};

export default Loader;
