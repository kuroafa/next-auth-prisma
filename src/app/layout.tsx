import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import Providers from "@/components/Providers";
import { getAuthSession } from "@/lib/next-auth";
import Sidebar from "@/components/navbar/Sidebar";
import Footer from "@/components/Footer";

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
          <body className={cn(inter.className, "antialiased flex gap-2")}>
            <div className="flex-[.1]">{!!session?.user && <Sidebar />}</div>
            <div className="flex-[.9]">{children}</div>
          </body>
        </div>
      </Providers>
    </html>
  );
}
