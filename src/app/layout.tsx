import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/components/Providers";
import { getAuthSession } from "@/lib/next-auth";
import Sidebar from "@/components/navbar/Sidebar";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realtor.io",
  description: "Made to help realtor's succeed",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAuthSession();

  return (
    <html lang="en">
      <Providers>
        <Navbar />
        <div>
          <body
            className={cn(
              inter.className,
              `antialiased flex flex-col gap-2 px-4 lg:px-0  ${
                session?.user ? "xl:flex-row" : ""
              }`
            )}
          >
            {!!session?.user && (
              <div className="lg:flex-[0.1]">
                <Sidebar />
              </div>
            )}
            <div
              className={`${
                !!session?.user ? "flex-[.9] lg:pr-8" : "flex-1"
              } mt-16  `}
            >
              {children}
              <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
              />
              <ToastContainer />
            </div>
          </body>
        </div>
      </Providers>
    </html>
  );
}
