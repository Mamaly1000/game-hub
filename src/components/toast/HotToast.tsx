import vazirFont from "@/common/local-fonts/VazirFont";
import React from "react";
import { Toaster } from "react-hot-toast";

const HotToast = () => {
  return (
    <Toaster
      position="bottom-right"
      containerStyle={{ fontFamily: vazirFont.style.fontFamily }}
    />
  );
};

export default HotToast;
