import { number, z } from "zod";

export const clientCreationSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  budget: z.string(),
  preApproved: z.boolean(),
  occupation: z.string(),
  maritalStatus: z.string(),
  children: z.string(),
  notes: z.string(),
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
