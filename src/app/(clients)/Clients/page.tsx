import SearchClient from "@/components/SearchClient";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { UserPlus } from "lucide-react";
import Link from "next/link";
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
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold">My Clients</h1>
          <Link href={"/add-client"}>
              <Button className="w-full gap-2" variant="outline">
                New Client
                <UserPlus size={20} />
              </Button>
            </Link>
        </div>
        <SearchClient clientData={fetchClients} />
      </div>
    </>
  );
};

export default page;
