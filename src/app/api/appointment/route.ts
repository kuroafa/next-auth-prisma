import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { DeletionSchema, appointmentCreationSchema } from "@/lib/type";
import { NextResponse } from "next/server";
import { ZodError, z } from "zod";

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
    const { name, address, time, completed, type, date, clientId } =
      appointmentCreationSchema.parse(body);

    const appointment = await prisma.appointment.create({
      data: {
        userId: session.user.id,
        name: name,
        address: address,
        time: time,
        completed: completed,
        date: date.toString(),
        type: type,
        clientId: clientId,
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
    const session = await getAuthSession();
    if (!session?.user) {
      return NextResponse.json(
        { error: "User not authenticated" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { id } = DeletionSchema.parse(body);
    const deleteAppointment = await prisma.appointment.delete({
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
    console.log("Error deleting appointment", error);
    return NextResponse.json(
      { error: "Internal Error Deleting Appointment" },
      { status: 500 }
    );
  }
}
