import SearchClient from "@/components/SearchClient";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";

type Props = {};

export const metadata = {
  title: "Clients | Realtor.io",
};

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
      <div className="mt-10">
        <h1 className="text-3xl font-semibold">My Clients</h1>
        <SearchClient clientData={fetchClients} />
      </div>
    </>
  );
};

export default page;
