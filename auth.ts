import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...(db
    ? {
        adapter: DrizzleAdapter(db, {
          usersTable: schema.users,
          accountsTable: schema.accounts,
          sessionsTable: schema.sessions,
          verificationTokensTable: schema.verificationTokens,
        }),
        session: { strategy: "database" as const },
      }
    : {
        session: { strategy: "jwt" as const },
      }),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, user, token }) {
      if (session.user) {
        session.user.id = user?.id ?? (token.sub as string);
      }
      return session;
    },
  },
});
