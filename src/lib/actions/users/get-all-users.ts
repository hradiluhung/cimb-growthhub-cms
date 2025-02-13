'use server'

import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'

export async function getAllUsers(): Promise<User[]> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    const result = await response.json()

    const users = result.data
    return users
  } else {
    throw new Error('Gagal mengambil data pengguna')
  }
}
