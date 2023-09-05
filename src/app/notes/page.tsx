import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import NotesTable from "@/components/NotesTable";

type Props = {
  notes: string;
  name: string;
};

export const metadata = {
  title: "Notes | Realtor.io",
};

const pages = async ({ notes, name }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const fetchClientNotes = await prisma.client.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      name: true,
      notes: true,
      id: true,
      preApproved: true,
    },
  });

  return (
    <>
      <div>
        <NotesTable clientData={fetchClientNotes} />
      </div>
    </>
  );
};

export default pages;
