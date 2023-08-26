import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import {
  DeletionSchema,
  appointmentCreationSchema,
  clientCreationSchema,
} from "@/lib/type";
import { NextResponse } from "next/server";
import { type } from "os";
import { z } from "zod";

export async function POST(req: Request, res: Response) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      console.log("User is not authenticated");
      return NextResponse.json(
        { error: "You must be logged in to create a appointment." },
        {
          status: 401,
        }
      );
    }
    const body = await req.json();
    const { name, address, time, completed, type, date } =
      appointmentCreationSchema.parse(body);

    const appointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        name: name,
        address: address,
        time: time,
        completed: completed,
        date: date,
        type: type,
        clientId: "cllrd172y0001er3oefjbqcvv",
      },
    });

    console.log("appointment record created:", appointment);
  } catch (error) {
    console.error("Error creating a appointment:", error);
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
    const deleteAppointment = await prisma.appointment.delete({
      where: {
        id: id,
      },
    });
    console.log("appointment deleted: ", deleteAppointment);
  } catch (error) {
    console.log("error deleting appointment", error);
  }
}
