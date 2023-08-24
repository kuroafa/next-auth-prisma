import { z } from "zod";

export const clientCreationSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  // id: z.string(),
  // dateOfBirth: z.string(),
  // address: z.string(),
  // city: z.string(),
  // state: z.string(),
  // zipCode: z.string(),
  // budget: z.string(),
  // preApproved: z.boolean(),
  // occupation: z.string(),
  // maritalStatus: z.string(),
  // children: z.string(),
  // notes: z.string(),
});

export type ClientCreation = z.infer<typeof clientCreationSchema>;
