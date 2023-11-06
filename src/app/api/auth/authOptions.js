import prisma from 'src/prisma/client'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'username',
          placeholder: 'username'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { username: credentials.username }
        })

        if (!user) return null

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

        if (passwordsMatch) {
          await prisma.user.update({
            where: { username: credentials.username },
            data: {
              isLoggedIn: true
            }
          })
        }

        return passwordsMatch ? user : null
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET
  },

  debug: process.env.NODE_ENV === 'development',

  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.username = user.username
        token.isLoggedIn = user.isLoggedIn
        token.avatar = user.avatar
      }

      return token
    },

    // extend session with custom data
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.username = String(token.username)
        session.user.isLoggedIn = token.isLoggedIn
        session.user.avatar = token.avatar
      }

      return session
    }
  }
}
