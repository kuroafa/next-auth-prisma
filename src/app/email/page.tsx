import SendEmail from "@/components/SendEmail";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

type Props = {};

export const metadata = {
  title: "Email | Realtor.io",
};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const fetchClientEmails = await prisma.client.findMany({
    where: {
      userId: session.user.id,
    },
  });
  return (
    <>
      <h1 className="text-3xl font-medium pt-3">Email Clients</h1>
      <SendEmail clientData={fetchClientEmails} />
    </>
  );
};

export default page;
