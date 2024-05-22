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
        name: {
          label: 'name',
          type: 'text',
          placeholder: 'name'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.name || !credentials.password) return null

        const user = await prisma.user.findUnique({
          where: { name: credentials.name }
        })

        if (!user) return null

        const passwordsMatch = await bcrypt.compare(credentials.password, user.password)

        if (passwordsMatch) {
          await prisma.user.update({
            where: { name: credentials.name },
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
        token.name = user.name
        token.isLoggedIn = user.isLoggedIn
        token.avatar = user.avatar
      }

      return token
    },

    // extend session with custom data
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.name = String(token.name)
        session.user.isLoggedIn = token.isLoggedIn
        session.user.avatar = token.avatar
      }

      return session
    }
  }
}
