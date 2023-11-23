import React from "react";
import SingleService from "./SingleService";
import { FaTruckMoving } from "react-icons/fa";
import { RiCustomerService2Line } from "react-icons/ri";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
const Services = () => {
  return (
    <section className="min-w-full min-h-fit flex items-center justify-center gap-5 flex-wrap relative py-5">
      <SingleService
        icon={<FaTruckMoving className="w-[80px] h-[80px] " />}
        title="حمل و نقل رایگان"
        description="از راحتی خرید آنلاین لذت ببرید بدون نگرانی از هزینه های اظافی. ما ارسال رایگان برای تمام سفارشات را ارایه میدهیم."
      />
      <SingleService
        description="تیم خدمات مشتری ما همیشه در دسترس است تا به شما در هر سوال و یا نگرانی کمک کند . بگونه ای که روز یا شب، ما اینجا هستیم تا کمک کنیم."
        icon={<RiCustomerService2Line className="w-[80px] h-[80px]" />}
        title="خدمات مشتری 24/7"
      />
      <SingleService
        description="ما با یک گارانتی بازگشت وجه پشتوانه کیفیت محصولاتمان هستیم. رضایت شما اولویت ماست و ما می خواهیم از خرید خود اطمینان داشته باشید."
        icon={<LiaMoneyBillWaveSolid className="w-[80px] h-[80px] " />}
        title="گارانتی بازگشت پول"
      />
    </section>
  );
};

export default Services;
