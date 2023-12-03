import NextAuth from "next-auth";
import Github from 'next-auth/providers/github'
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from 'app/db'

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = process.env

if(!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw Error('Missing github OAuth Credentials')
}

export const { 
  handlers: { GET, POST }, 
  auth, 
  signOut, 
  signIn 
} = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    Github({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET
    })
  ],
  callbacks: {
    //Usually not needed, here we are fixing a bug in nextauth
    async session({ session, user }) {
      if(session?.user && user) {
        session.user.id = user.id
      }
      return session
    }
  },
  debug: process.env.NODE_ENV === 'development',
})