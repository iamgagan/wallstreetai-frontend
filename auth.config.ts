import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import LinkedIn from "next-auth/providers/linkedin";
import Apple from "next-auth/providers/apple";
import { LoginSchema } from "./schemas";

// can use prisma here because it doesn't run on the edge
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    LinkedIn({
      clientId: process.env.LINKEDIN_ID,
      clientSecret: process.env.LINKEDIN_SECRET,
    }),
    Apple({
      clientId: process.env.APPLE_ID || "",
      clientSecret: process.env.APPLE_SECRET || "",
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);
        if (validatedFields.success) {
          // const { email, password } = validatedFields.data;
          // const user = await getUserByEmail(email);
          // if (!user || !user.password) {
          //   return null;
          // }
          // const passwordsMatch = await bcryptjs.compare(
          //   password,
          //   user.password
          // );
          // if (passwordsMatch) {
          //   return user;
          // }
          return validatedFields.data;
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
