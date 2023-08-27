import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/navbar/SignInButton";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";
import { prisma } from "@/lib/db";
import NotesCard from "@/components/notesCard";
import { Client } from "@prisma/client";

type Props = {
  notes: string;
  name: string;
};

const pages = async ({ notes, name, }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const fetchClientNotes = await prisma.client.findMany({
    where: {
      notes: notes,
      name: name,
    },
  });
  return (
    <div>
      {fetchClientNotes.map((notes, idx) => {
        return (
          <NotesCard key={idx} clientData={notes}/>
        );
      })}
    </div>
  );
};

export default pages;
