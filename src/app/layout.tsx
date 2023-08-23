import { cn } from "@/lib/utils";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Providers from "@/components/Providers";
import { getAuthSession } from "@/lib/next-auth";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realtor.io",
  description: "Made to help realtor's successed",
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
        {session?.user ? <Sidebar /> : <Navbar />}
        <body className={cn(inter.className, "antialiased  ")}>{children}</body>
      </Providers>
    </html>
  );
}
