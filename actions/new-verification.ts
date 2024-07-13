"use server";
/**
 * we need to query the token from the db, so have to indicate use server
 */

export const newVerification = async (token: string) => {
  // To do: implement email verification logic here

  return { success: "Email verified!" };
};
