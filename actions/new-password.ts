'use server';

import { z } from 'zod';
import { NewPasswordSchema } from '@/schemas/index';

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token?: string | null
) => {
  if (!token) {
    return { error: 'Missing token!' };
  }
  const validatedFields = NewPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const { password } = validatedFields.data;

  // To do: implement password reset logic here

  return { success: 'Password updated!' };
};
