import CredentialsProvider from 'next-auth/providers/credentials'

const authURL = process.env.NEXTAUTH_URL

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'John Smith'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const { username, password } = credentials

        const res = await fetch(authURL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            withCredentials: true
          },
          body: JSON.stringify({
            username,
            password
          })
        })

        const user = await res.json()
        if (res.ok && user) {
          return user
        } else return null
      }
    })
  ],

  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token

      return session
    },
    secret: process.env.NEXTAUTH_SECRET

    // Other callback functions
  }
}

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
