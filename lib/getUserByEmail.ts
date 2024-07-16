import { db } from "@/lib/db";

export const getUserByEmail = async (email: string | undefined) => {
  if (!email || db.user === undefined) return null;
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  if (!id || db.user === undefined) return null;
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};
