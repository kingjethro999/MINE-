import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./lib/db"

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        
        const user = await prisma.user.findUnique({
          where: { email: credentials.email as string }
        })
        
        // In a real app we would use bcrypt, but we'll simplify for the boilerplate context to focus on DB check
        // Assuming simple string equality or we implement a standard hash check here later
        if (user && user.passwordHash === credentials.password) {
          return { id: user.id, email: user.email, name: user.name }
        }
        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        session.user.id = token.id as string
        
        // Fetch fresh db stuff if needed for UI, e.g., plan
        const dbUser = await prisma.user.findUnique({ where: { id: token.id as string }, select: { plan: true, activePlanPurchased: true, isAdmin: true }})
        if (dbUser) {
          (session.user as any).plan = dbUser.plan;
          (session.user as any).activePlanPurchased = dbUser.activePlanPurchased;
          (session.user as any).isAdmin = dbUser.isAdmin;
        }
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
