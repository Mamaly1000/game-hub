import React, { ReactNode } from "react";

const Box = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-w-full min-h-[300px] flex items-center justify-center flex-col gap-3 p-3">
      {children}
    </div>
  );
};

export default Box;
