import { number, z } from "zod";

export const clientCreationSchema = z.object({
  name: z
    .string({
      required_error: "Name is required!",
    })
    .nonempty()
    .min(2, "Name too short")
    .max(50, "Exceeded name length"),
  phoneNumber: z
    .string({ required_error: "Phone number is required!" })
    .nonempty(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Not a valid email")
    .nonempty(),
  budget: z.string({ required_error: "Budget is required" }).nonempty(),
  preApproved: z.boolean().default(false),
  occupation: z.string({ required_error: "Occupation is required" }).nonempty(),
  maritalStatus: z.enum(
    ["MARRIED", "DIVORCED", "SEPARATED", "WIDOWED", "SINGLE"],
    { errorMap: (issue, ctx) => ({ message: "You cannot leave this empty" }) }
  ),
  children: z.string().nonempty().default("0"),
  notes: z.string().default("No notes"),
  notesPriority: z.boolean(),
});

export const appointmentCreationSchema = z.object({
  name: z.string(),
  address: z.string(),
  time: z.string(),
  completed: z.boolean(),
  date: z.string(),
  type: z.string(),
  clientId: z.string(),
});

export const emailSendSchema = z.object({
  name: z
    .string({ required_error: "Cannot leave this empty" })
    .nonempty("This field is required")
    .min(2, "Name too short")
    .max(50, "Name too long"),
  email: z
    .string({ required_error: "Cannot leave email empty" })
    .email("Not valid email")
    .nonempty("This field is required"),
  subject: z
    .string({ required_error: "Cannot leave this empty" })
    .nonempty("Cannot be empty")
    .min(2, "Subject too short"),
  message: z
    .string({ required_error: "Cannot send an email without a message" })
    .nonempty()
    .min(2),
});

export const DeletionSchema = z.object({
  id: z.string(),
});

export type EmailSchema = z.infer<typeof emailSendSchema>;

export type DeleteSchema = z.infer<typeof DeletionSchema>;

export type AppointmentCreation = z.infer<typeof appointmentCreationSchema>;

export type ClientCreation = z.infer<typeof clientCreationSchema>;
