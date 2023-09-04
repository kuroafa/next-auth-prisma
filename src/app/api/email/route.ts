import { emailSendSchema } from "@/lib/type";
import sendgrid from "@sendgrid/mail";
import { NextResponse } from "next/server";
import { emailTemplate } from "@/app/emailTemplates/template";

export async function POST(req: Request, res: Response) {
  try {
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY as string);

    const body = await req.json();

    const { email, subject, name, message } = emailSendSchema.parse(body);

    const sendGridMessage = {
      to: email,
      from: "meetlyrealestate@gmail.com",
      subject: subject,
      html: emailTemplate.replace("{name}", name).replace("{message}", message),
    };

    sendgrid
      .send(sendGridMessage)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error) => {
        console.error(error);
      });

    return NextResponse.json(
      { message: "Email Send Successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error, "error sending email");
    return NextResponse.json({
      error: "Error sending email",
      status: 401,
    });
  }
}
