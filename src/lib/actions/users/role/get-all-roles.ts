'use server'
import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'

export async function getAllRoles(): Promise<Role[]> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const response = await fetch(`${BASE_URL}/roles`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    const result = await response.json()

    const roles = result.data
    return roles
  } else {
    throw new Error('Gagal mengambil data role')
  }
}
