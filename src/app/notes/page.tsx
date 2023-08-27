import React from "react";
import { getAuthSession } from "@/lib/next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/components/navbar/SignInButton";
import { ThemeToggle } from "@/components/navbar/ThemeToggle";
import UserAccountNav from "@/components/navbar/UserAccountNav";
import { prisma } from "@/lib/db";
import NotesCard from "@/components/NotesCard";
import { Client } from "@prisma/client";
import Image from "next/image";
import SearchedNotes from "@/components/SearchedNotes";

type Props = {
  notes: string;
  name: string;
};

const pages = async ({ notes, name }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) {
    return redirect("/");
  }

  const fetchClientNotes = await prisma.client.findMany({
    where: {},
  });
  return (
    <>
      <div>
        <SearchedNotes clientData={fetchClientNotes} />
      </div>
    </>
  );
};

export default pages;
