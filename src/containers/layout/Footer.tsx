"use client";
import { github, linkedin, telegram, twitterx } from "@/assets/socials/socials";
import Custom_link from "@/components/inputs/Custom_link";
import Normal_textfield from "@/components/inputs/Normal_textfield";
import {
  Circle,
  CircleNotifications,
  Copyright,
  DockTwoTone,
  Info,
  Radio,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const socials = [twitterx, github, telegram, linkedin];
const links = [
  {
    title: "درباره",
    related_links: [
      "درباره ما",
      "مجموعه ها",
      "فروشگاه",
      "وبلاگ",
      "با ما تماس بگیرید",
    ],
  },
  {
    title: "لینک های مفید",
    related_links: [
      "سیاست حفظ حریم خصوصی",
      "شرایط استفاده",
      "حمایت کردن",
      "جزئیات حمل و نقل",
      "سوالات متداول",
    ],
  },
];
const Footer = () => {
  return (
    <footer className="col-span-12 min-w-full   bg-secondary-800 items-start justify-start gap-3 flex-col px-10 py-12 ">
      <section className=" min-w-full min-h-fit flex  flex-wrap items-start justify-center pb-10 gap-3">
        <section className=" flex flex-col items-start justify-start gap-3 w-full md:min-w-[25%] md:max-w-[25%]    ">
          <div>
            <h5 className="capitalize font-bold text-[1.2rem] text-start">
              game-hub
            </h5>
            <p className="text-[.8rem] font-light max-w-[80%]">
              Game-Hub یک مقصد آنلاین پیشرو برای همه نیازهای بازی، رایانه شخصی،
              لپ تاپ، پیوست های فنی و فیلم شما است. با انتخاب گسترده ای از
              جدیدترین بازی ها، فناوری پیشرفته و خدمات مشتری درجه یک، ما در تلاش
              هستیم تا بهترین تجربه خرید را برای گیمرها و علاقه مندان به فناوری
              فراهم کنیم. تعهد ما به ارائه بهترین محصولات، قیمت های رقابتی و
              تحویل قابل اعتماد ما را به نامی قابل اعتماد در صنعت تبدیل کرده
              است. امروز به جامعه بازی ما بپیوندید و امکانات بی پایانی را که
              Game-Hub ارائه می دهد کشف کنید.
            </p>
          </div>
          <div className="min-w-full flex items-start justify-start gap-2  flex-col">
            <span>ما را دنبال کنید</span>
            <div className="min-w-full flex items-center justify-start gap-2 flex-wrap">
              {socials.map((pic) => (
                <Custom_link key={pic.src} href="/">
                  <Image alt="" src={pic.src} width={30} height={30} />
                </Custom_link>
              ))}
            </div>
          </div>
        </section>
        {links.map((col) => (
          <div
            key={col.title}
            className="min-w-full  sm:min-w-[47%] sm:max-w-[50%] md:min-w-[19%] md:max-w-[19%] flex flex-col items-start  justify-start gap-2   "
          >
            <span className="font-bold text-[1.2] capitalize text-start  ">
              {col.title}
            </span>
            <div className="flex flex-col items-start justify-start gap-2 ">
              {col.related_links.map((link) => (
                <Link key={link + Math.random()} href="/">
                  <Circle
                    sx={{
                      color: "rgb(var(--color-primary-900))",
                      width: 5,
                    }}
                    className="w-[10px] h-[10px] fill-primary-900"
                  />{" "}
                  {link}
                </Link>
              ))}
            </div>
          </div>
        ))}
        <section className="  flex flex-col items-start justify-start gap-3 w-full md:min-w-[25%] md:max-w-[25%]  ">
          <span className="capitalize font-bold text-[1.2rem] text-start">
            خبرنامه
          </span>
          <p className="text-[.8rem] font-light max-w-[80%]">
            با خبرنامه Game-Hub در جریان باشید و هرگز آخرین به‌روزرسانی‌ها،
            معاملات انحصاری و نسخه‌های جدید را از دست ندهید. اولین کسی باشید که
            در مورد نسخه های بازی های آینده، داغ ترین ابزارهای فناوری و تبلیغات
            هیجان انگیز مطلع می شوید. خبرنامه ما محتوای انتخاب شده را مستقیماً
            به صندوق ورودی شما ارائه می دهد و شما را مطلع و سرگرم نگه می دارد.
            چه یک خبره بازی باشید و چه از علاقه مندان به فناوری، عضویت در
            خبرنامه ما تضمین می کند که همیشه از آخرین روندها و نوآوری ها در
            دنیای بازی و فناوری به روز هستید. اکنون ثبت نام کنید و تجربه بازی
            خود را با Game-Hub ارتقا دهید!
          </p>
          <Normal_textfield
            label="ایمیل خود را وارد کنید"
            name="email"
            onError={(e) => {
              return { message: "", value: false };
            }}
            setValue={(e) => {}}
            value=""
          />
        </section>
      </section>
      <section className="  min-w-full flex items-center justify-between flex-col md:flex-row font-bold border-t-[3px] border-white py-5">
        <span>developed by Mohammad Mehdi Azizi</span>
        <span className="flex flex-row-reverse items-center justify-start">
          <Copyright /> all rights reserved. GAME-HUB{" "}
          {new Date().toLocaleDateString("fa-ir")}
        </span>
      </section>
    </footer>
  );
};

export default Footer;
