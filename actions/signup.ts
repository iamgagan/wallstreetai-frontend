"use server";
import { getUserByEmail } from "@/lib/getUserByEmail";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcryptjs from "bcryptjs";
import { db } from "@/lib/db";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

/**
 * manual sign up will be written to the database using this function
 */
export const signup = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: validatedFields.error.errors[0].message };
  }

  const { email, password } = validatedFields.data;
  const hashedPassword = await bcryptjs.hash(password, 10);
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use!" };
  }

  // To do: implement registration logic here
  try {
    await db.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return { error: "Something went wrong" };
  }

  await signIn("credentials", {
    email,
    password,
    redirectTo: DEFAULT_LOGIN_REDIRECT,
  });

  return { success: "Confirmation email sent!" };
};
