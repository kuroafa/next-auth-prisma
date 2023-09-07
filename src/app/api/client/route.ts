import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import {
  DeletionSchema,
  clientCreationSchema,
  clientUpdateSchema,
} from "@/lib/type";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

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
      notesPriority,
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
        notesPriority: notesPriority,
      },
    });

    return NextResponse.json(
      {
        message: "Success",
      },
      { status: 200 }
    );
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
    return NextResponse.json(
      {
        error: "Internal Error Creating Client",
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id } = DeletionSchema.parse(body);
    const deleteClient = await prisma.client.delete({
      where: {
        id: id,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.errors,
        },
        { status: 404 }
      );
    }
    console.log("Error deleting client", error);
    return NextResponse.json(
      { error: "Internal Error Deleting Client" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    console.log(body);
    const {
      id,
      budget,
      preApproved,
      occupation,
      maritalStatus,
      children,
      notes,
    } = await clientUpdateSchema.parse(body);

    const budgetInt = await parseInt(budget);
    const childrenInt = await parseInt(children);

    const updatedClient = await prisma.client.update({
      where: {
        userId: session.user.id,
        id: id,
      },
      data: {
        budget: budgetInt,
        preApproved: preApproved,
        occupation: occupation,
        maritalStatus: maritalStatus,
        children: childrenInt,
        notes: notes,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: error.errors,
        },
        { status: 404 }
      );
    }
    console.log("Error updating client", error);
    return NextResponse.json(
      { error: "Internal Error Updating Client" },
      { status: 500 }
    );
  }
}
