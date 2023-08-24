import { z } from 'zod';

export const clientCreationSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  email: z.string().email(),
  dateOfBirth: z.string(),
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