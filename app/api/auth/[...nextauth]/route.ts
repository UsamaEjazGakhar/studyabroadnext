import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@studyverse.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
          include: { role: true }
        });

        if (!user) {
          // If the user table is empty, allow a seed login for setup
          const userCount = await prisma.user.count();
          if (userCount === 0 && credentials.email === "admin@studyverse.com" && credentials.password === "password123") {
            const adminRole = await prisma.role.upsert({
              where: { name: "Admin" },
              update: {},
              create: { name: "Admin" }
            });
            const newUser = await prisma.user.create({
              data: {
                email: "admin@studyverse.com",
                passwordHash: await bcrypt.hash("password123", 10),
                roleId: adminRole.id
              },
              include: { role: true }
            });
            return { id: newUser.id.toString(), name: "Admin", email: newUser.email, role: newUser.role?.name ?? "" };
          }
          return null;
        }

          // Block non‑admin users whose account is not active
          if (user.role?.name !== 'Admin' && user.status !== 'Active') {
            throw new Error('Pending approval');
          }

        const isPasswordValid = await bcrypt.compare(credentials.password, user.passwordHash);

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: "User",
          email: user.email,
          role: user.role?.name ?? "",
        };
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
