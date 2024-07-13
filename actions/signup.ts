"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";

export const signup = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message };
  }

  const { email, password } = validatedFields.data;

  // To do: implement registration logic here

  return { success: "Confirmation email sent!" };
};
