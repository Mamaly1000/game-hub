import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className=" min-w-full min-h-[50px]   rounded-b-lg shadow-xl mb-2 flex items-center justify-center">
      <nav className="min-w-full min-h-full">
        <ul className="min-w-full px-10 md:px-20 flex items-center justify-between gap-2">
          <li>
            <Link href="/">خانه</Link>
          </li>
          <li>
            <Link href="/products">محصولات</Link>
          </li>
          <li>
            <Link href="/auth">ورود</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
