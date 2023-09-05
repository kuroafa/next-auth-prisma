import { prisma } from "@/lib/db";
import { getAuthSession } from "@/lib/next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(res: Response, req: Request) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json(
        {
          error: "User not authenticated",
        },
        { status: 401 }
      );
    }

    const demoUsers = [
      {
        userId: session.user.id,
        name: "John Doe",
        phoneNumber: "1234567890",
        email: "john.doe@example.com",
        budget: 250000,
        preApproved: true,
        occupation: "Software Developer",
        maritalStatus: "SINGLE",
        children: 0,
        notes:
          "Client is a first-time homebuyer looking for a cozy two-bedroom apartment in a family-friendly neighborhood.",
        notesPriority: true,
      },
      {
        userId: session.user.id,
        name: "Jane Smith",
        phoneNumber: "9876543210",
        email: "jane.smith@example.com",
        budget: 300000,
        preApproved: false,
        occupation: "Teacher",
        maritalStatus: "MARRIED",
        children: 2,
        notes:
          "Meeting went well; client is interested in waterfront properties with a budget of $100.5 million.",
        notesPriority: false,
      },
      {
        userId: session.user.id,
        name: "Michael Johnson",
        phoneNumber: "5551234567",
        email: "michael.j@example.com",
        budget: 120000,
        preApproved: true,
        occupation: "Accountant",
        maritalStatus: "SINGLE",
        children: 0,
        notes:
          "Client has a flexible timeline and is open to both renting and buying options.",
        notesPriority: true,
      },
      {
        userId: session.user.id,
        name: "Emily Davis",
        phoneNumber: "7778889999",
        email: "emily.d@example.com",
        budget: 340000,
        preApproved: false,
        occupation: "Graphic Designer",
        maritalStatus: "MARRIED",
        children: 1,
        notes:
          "Noted the client's preference for modern architecture and minimalistic design.",
        notesPriority: false,
      },
      {
        userId: session.user.id,
        name: "Daniel Wilson",
        phoneNumber: "4445556666",
        email: "daniel.w@example.com",
        budget: 230000,
        preApproved: true,
        occupation: "Engineer",
        maritalStatus: "SINGLE",
        children: 0,
        notes:
          "Client mentioned relocating for a job, so urgency might be a factor in their decision-making.",
        notesPriority: true,
      },
      {
        userId: session.user.id,
        name: "Olivia Lee",
        phoneNumber: "1112223333",
        email: "olivia.l@example.com",
        budget: 730000,
        preApproved: false,
        occupation: "Nurse",
        maritalStatus: "MARRIED",
        children: 3,
        notes:
          "Discussed the need for a backyard space for the client's three energetic dogs.",
        notesPriority: false,
      },
      {
        userId: session.user.id,
        name: "William Brown",
        phoneNumber: "9993331111",
        email: "william.b@example.com",
        budget: 270000,
        preApproved: true,
        occupation: "Sales Manager",
        maritalStatus: "SINGLE",
        children: 0,
        notes:
          "Client expressed interest in historic homes; will research available listings in heritage districts.",
        notesPriority: true,
      },
      {
        userId: session.user.id,
        name: "Sophia Taylor",
        phoneNumber: "6667778888",
        email: "sophia.t@example.com",
        budget: 590000,
        preApproved: false,
        occupation: "Marketing Specialist",
        maritalStatus: "MARRIED",
        children: 2,
        notes:
          "Noted the client's desire for a home with a home office or dedicated workspace.",
        notesPriority: false,
      },
      {
        userId: session.user.id,
        name: "Matthew Anderson",
        phoneNumber: "3334445555",
        email: "matthew.a@example.com",
        budget: 940000,
        preApproved: true,
        occupation: "Real Estate Investor",
        maritalStatus: "SINGLE",
        children: 0,
        notes:
          "Client is an investor looking for income-generating properties; discussed potential rental yields.",
        notesPriority: true,
      },
      {
        userId: session.user.id,
        name: "Ava Martinez",
        phoneNumber: "2221119999",
        email: "ava.m@example.com",
        budget: 160000,
        preApproved: false,
        occupation: "Web Developer",
        maritalStatus: "MARRIED",
        children: 1,
        notes:
          "Suggested arranging a second showing for the client to view the property during daylight hours.",
        notesPriority: false,
      },
    ];
    revalidatePath("/");

    for (const demoUser of demoUsers) {
      const createdClient = await prisma.client.create({
        data: {
          ...demoUser,
        },
      });

      const randomDate = new Date(
        Date.now() + Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
      );

      const randomTime = `${Math.floor(Math.random() * 12) + 1}:${Math.floor(
        Math.random() * 60
      )} ${Math.random() < 0.5 ? "AM" : "PM"}`;

      const appointmentTypes = [
        "SHOWING",
        "APPRASIAL",
        "INSPECTION",
        "WALK_THROUGH",
        "PHOTOGRAPHY",
        "AGENT_PREVIEW",
      ];
      const randomAppointmentType =
        appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)];

      const appointmentData = {
        userId: session.user.id,
        name: `Appointment for ${createdClient.name}`,
        address: `Address for ${createdClient.name}`,
        type: randomAppointmentType,
        time: randomTime,
        date: randomDate.toISOString().slice(0, 10),
        clientId: createdClient.id,
      };

      await prisma.appointment.create({
        data: appointmentData,
      });
      revalidateTag("/");
    }

    console.log("Demo users and appointments created successfully");

    return NextResponse.json(
      {
        message: "Data Added Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log("Error adding demo data: " + error);

    if (error instanceof ZodError) {
      return NextResponse.json({ error: error.errors });
    }
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request, res: Response) {
  try {
    await prisma.appointment.deleteMany({});
    await prisma.client.deleteMany({});
    revalidateTag("/");
    return NextResponse.json(
      { message: "Data cleared successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error clearing data", error);
    return NextResponse.json(
      { error: "Internal error while clearing data" },
      { status: 500 }
    );
  }
}
