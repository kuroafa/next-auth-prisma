import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { DeletionSchema, clientCreationSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        { error: "You must be logged in to create a Client." },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const {
      name,
      email,
      phoneNumber,
      budget,
      preApproved,
      maritalStatus,
      notes,
      children,
      occupation,
    } = clientCreationSchema.parse(body);

    const intBudget = parseInt(budget);
    const intChildren = parseInt(children);

    const client = await prisma.client.create({
      data: {
        name: name,
        email: email,
        phoneNumber: phoneNumber,
        preApproved: preApproved,
        maritalStatus: maritalStatus,
        notes: notes,
        budget: intBudget,
        children: intChildren,
        occupation: occupation,
        userId: session.user.id,
      },
    });

    console.log("client record created:", client);
  } catch (error) {
    console.error("Error creating a client:", error);
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.issues },
        {
          status: 400,
        }
      );
    }
  }
}
export async function DELETE(req: Request, res: Response) {
  try {
    const body = await req.json();
    const { id } = DeletionSchema.parse(body);
    const deleteClient = await prisma.client.delete({
      where: {
        id: id,
      },
    });
    console.log("client deleted: ", deleteClient);
  } catch (error) {
    console.log("error deleting client", error);
  }
}