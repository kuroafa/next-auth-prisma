import { z } from "zod";

export const clientCreationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  // id: z.string(),
  // dateOfBirth: z.string(),
  address: z.string(),
  city: z.string(),
  state: z.string(),
  zipCode: z.string(),
  budget: z.string(),
  preApproved: z.boolean(),
  occupation: z.string(),
  maritalStatus: z.string(),
  children: z.string(),
  notes: z.string(),
});

export const appointmentCreationSchema = z.object({
  name: z.string(),
  address: z.string(),
  time: z.number(),
  completed: z.boolean(),
  date: z.number(),
  type: z.string()
})

export const DeletionSchema = z.object({
  id: z.string()
})

export type DeleteSchema = z.infer<typeof DeletionSchema>;

export type AppointmentCreation = z.infer<typeof appointmentCreationSchema>;

export type ClientCreation = z.infer<typeof clientCreationSchema>;
