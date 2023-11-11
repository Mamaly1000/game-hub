import React, { ReactNode } from "react";

const Box = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-w-full min-h-[300px] flex items-center justify-center flex-col gap-3 p-3 [&>button]:px-3 [&>button]:py-2 [&>button]:rounded-lg">
      {children}
    </div>
  );
};

export default Box;
