import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { BASE_URL } from '../constants'

async function authenticateUser(username: string, password: string) {
  const data = JSON.stringify({ username, password })

  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: data,
  })

  if (response.status !== 200) return null

  return await response.json()
}

async function getDetailUser(token: string) {
  const response = await fetch(`${BASE_URL}/user-by-token`, {
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
  })

  return await response.json()
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (credentials) {
          const { data } = await authenticateUser(credentials.username, credentials.password)
          const { data: detailUser } = await getDetailUser(data.token)

          return {
            id: detailUser.id,
            role: detailUser.role.name,
            name: detailUser.profile?.nama ?? '',
            email: detailUser.profile?.email ?? '',
            token: data.token,
          }
        }

        return null
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          name: user.name,
          email: user.email,
          token: user.token,
        }
      }

      return token
    },

    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          name: token.name,
          email: token.email,
          token: token.token,
        },
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
}
