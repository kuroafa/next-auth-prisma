import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";
import LearnMore from "@/components/LearnMore";
type Props = {};

export const metadata = {
  title: "Learn More | Realtor.io",
};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (session?.user) {
    return redirect("/dashboard");
  }
  return (
    <div>
      <LearnMore />
      <Footer />
    </div>
  );
};

export default page;
