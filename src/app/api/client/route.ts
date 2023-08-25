import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { clientCreationSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        { error: "You must be logged in to create a task." },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { firstName, lastName, email, phoneNumber, address,city, state ,zipCode, budget, preApproved, maritalStatus, notes, children,occupation } =
      clientCreationSchema.parse(body);

    const client = await prisma.client.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        address: address,
        city:city,
        state: state,
        zipCode: zipCode,
        preApproved: preApproved,
        maritalStatus: maritalStatus,
        notes: notes,
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

