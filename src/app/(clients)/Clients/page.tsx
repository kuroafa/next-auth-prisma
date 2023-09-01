import SearchClient from "@/components/SearchClient";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

type Props = {};

const page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    redirect("/");
  }

  const fetchClients = await prisma.client.findMany({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <>
      <SearchClient clientData={fetchClients} />
    </>
  );
};

export default page;
