import type { Metadata } from "next";
import "./../globals.css";
import Header from "./Header";
import vazirFont from "@/common/local-fonts/VazirFont";
import Providers from "@/services/QueryProvider";
import HotToast from "@/components/toast/HotToast";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Footer from "@/containers/layout/Footer";
import ResponsiveAppBar from "./CustomHeader";
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white ${vazirFont.className}`}
      >
        <Providers>
          <ResponsiveAppBar />
          <div className="bg-secondary-900 text-white col-span-full grid grid-cols-12 min-w-full min-h-screen max-h-fit">
            {children}
            <Footer />
          </div>
        </Providers>
        <HotToast />
      </body>
    </html>
  );
}
