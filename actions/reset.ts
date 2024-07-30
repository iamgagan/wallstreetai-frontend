'use server';

import { ResetSchema } from '@/schemas';
import { z } from 'zod';

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  // const validatedFields = ResetSchema.safeParse(values);

  // if (!validatedFields.success) {
  //   return { error: "Invalid email" };
  // }
  // const { email } = validatedFields.data;

  // const existingUser = await getUserByEmail(email);

  // if (!existingUser || !existingUser.email || !existingUser.password) {
  //   return { error: "Email does not exist" };
  // }
  // const passwordResetToken = await generatePasswordResetToken(
  //   existingUser.email
  // );

  // await sendPasswordResetEmail(
  //   passwordResetToken.email,
  //   passwordResetToken.token
  // );

  return { success: 'Reset email sent!' };
};
