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

export const DeletionSchema = z.object({
  id: z.string(),
});

export type DeleteSchema = z.infer<typeof DeletionSchema>;

export type AppointmentCreation = z.infer<typeof appointmentCreationSchema>;

export type ClientCreation = z.infer<typeof clientCreationSchema>;
