import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div className="flex h-full flex-col ">
      <Hero />
      <Footer/>
    </div>
  );
}
