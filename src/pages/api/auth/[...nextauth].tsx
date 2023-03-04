import NextAuth, { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import prisma from '@/lib/prisma'
import { generateUniqueUsername, saveImage } from '@/utils/dbUtils'

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
          id: user.id as string,
          username: user.username as string
        }
      }

      return session
    }
  },
  events: {
    async createUser(user) {
      const fileName = await saveImage(
        user.user.image as string,
        user.user.id as string
      )
      const username = await generateUniqueUsername(user.user.email as string)

      fileName &&
        user.user.id &&
        (await prisma.user.update({
          where: { id: user.user.id },
          data: { username, image: `avatars/${fileName.path}` }
        }))
    }
  }
}

export default NextAuth(authOptions)
