import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { generateUniqueUsername } from '@/utils/dbUtils'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code'
        }
      }
    })
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout'
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith('/')) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, user }) {
      if ('username' in user) {
        session.user = {
          ...session.user,
          username: user.username as string
        }
      }
      console.log(session)
      return session
    }
  },
  events: {
    async createUser(user) {
      const firstEmailPart = user.user.email?.split('@')[0] || ''
      const username = await generateUniqueUsername(firstEmailPart)
      await prisma.user.update({
        where: { id: user.user.id },
        data: { username }
      })
    }
  }
}

export default NextAuth(authOptions)
