'use server'

export async function login(username: string, password: string) {
  // TODO: Implement login
  console.log(username, password)

  const isAdmin = username === 'admin' && password === 'admin'

  return {
    role: isAdmin ? 'admin' : 'hr',
  }
}
