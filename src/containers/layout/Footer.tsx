"use client";
import { github, linkedin, telegram, twitterx } from "@/assets/socials/socials";
import Normal_textfield from "@/components/inputs/Normal_textfield";
import { Copyright } from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const socials = [twitterx, github, telegram, linkedin];
  const links = [
    {
      title: "about",
      related_links: ["about us", "collections", "shop", "blog", "contact us"],
    },
    {
      title: "useful links",
      related_links: [
        "privacy policy",
        "terms of use",
        "support",
        "shipping details",
        "FAQs",
      ],
    },
  ];
  return (
    <footer className="col-span-12 min-w-full min-h-fit bg-secondary-800 flex items-center justify-center gap-3 flex-col p-12 ">
      <section className="min-w-full flex items-center justify-between">
        <div>
          <div>
            <h5>game-hub</h5>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem,
              eos molestiae error perferendis maxime suscipit laborum dolorum
              quas? Doloribus dolore ex ullam dolores ratione iure obcaecati
              eius quaerat aliquam voluptatum!
            </p>
          </div>
          <div>
            <span>ما را دنبال کنید</span>
            <div>
              {socials.map((pic) => (
                <Image alt="" src={pic.src} width={30} height={30} />
              ))}
            </div>
          </div>
        </div>
        {links.map((col) => (
          <div>
            <span>{col.title}</span>
            <div>
              {col.related_links.map((link) => (
                <Link href="/">{link}</Link>
              ))}
            </div>
          </div>
        ))}
        <div>
          <span>newsletter</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia,
            mollitia. Impedit, autem voluptatem veniam, rerum cumque ipsum atque
            quam dolorum quos sequi ea alias laborum nam quis perspiciatis
            aliquam eveniet!
          </p>
          <Normal_textfield
            label="enter your email"
            name="email"
            onError={(e) => {
              return { message: "", value: false };
            }}
            setValue={(e) => {}}
            value=""
          />
        </div>
      </section>
      <section className="min-w-full flex items-center justify-between flex-col md:flex-row">
        <span>
          <Copyright /> all rights reserved. GAME-HUB{" "}
          {new Date().getUTCFullYear()}
        </span>
        <span>developed by Mohammad Mehdi Azizi</span>
      </section>
    </footer>
  );
};

export default Footer;
