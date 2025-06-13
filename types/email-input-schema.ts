import { z } from "zod";

export const emailInputSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const addUserEmailToProductSchema = z.object({
  productId: z.string(),
  userEmail: z.string().email(),
});
