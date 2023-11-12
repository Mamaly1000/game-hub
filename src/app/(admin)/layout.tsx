import vazirFont from "@/common/local-fonts/VazirFont";
import HotToast from "@/components/toast/HotToast";
import Providers from "@/services/QueryProvider";
import "./../globals.css";
import SideBar from "@/components/admin-sidebar/SideBar";
export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={
          vazirFont.className +
          " grid grid-cols-12 gap-2 grid-rows-6 bg-primary-300 dark:bg-secondary-900 text-secondary-900 dark:text-white "
        }
        suppressHydrationWarning={true}
      >
        <Providers>
          <SideBar />
          <div className="col-span-9 row-span-full max-h-screen min-h-screen overflow-y-auto bg-inherit text-inherit p-5">
            {children}
          </div>
          <HotToast />
        </Providers>
      </body>
    </html>
  );
}
