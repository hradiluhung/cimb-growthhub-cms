import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: string
      name: string
      email: string
      token: string
    }
  }
  interface User {
    id: string
    role: string
    name: string
    email: string
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string
      role: string
      name: string
      email: string
      token: string
    }
  }
}
