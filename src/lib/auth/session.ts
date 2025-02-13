import { getServerSession } from 'next-auth'
import { authOptions } from './auth-options'

export async function getSessionRole(): Promise<'admin' | 'hr' | undefined> {
  const session = await getServerSession(authOptions)

  const role = session?.user.role

  if (role === 'admin' || role === 'hr') {
    return role
  }

  return undefined
}

export async function getToken() {
  const session = await getServerSession(authOptions)

  return session?.user.token
}
