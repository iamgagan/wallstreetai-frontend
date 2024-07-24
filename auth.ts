import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserByEmail, getUserById } from "./lib/getUserByEmail";

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    error: "/auth/error",
  },
  events: {
    /**
     * this event is triggered for Google & github providers accounts
     */
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: {
          emailVerified: new Date(),
        },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // allow oauth without email verification
      if (account?.provider !== "credentials") return true;

      const dbUser = await getUserById(user?.id);
      // // prevent sign in without email verification
      if (!dbUser?.email) return false;
      // add 2fa check here
      return true;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        const dbUser = await getUserByEmail(session.user.email);
        return {
          ...session,
          user: {
            ...session.user,
            id: token.sub,
            role: token.role,
            ...dbUser,
          },
        };
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      return {
        ...token,
        role: existingUser?.role,
      };
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
