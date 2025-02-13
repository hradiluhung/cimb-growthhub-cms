'use server'

import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'

export async function getUserById(id: string): Promise<User> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  console.log('REPSONSE', response)

  if (response.ok) {
    const result = await response.json()

    const user = result.data
    return user
  } else {
    throw new Error('Gagal mengambil data pengguna')
  }
}
