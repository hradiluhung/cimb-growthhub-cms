'use server'
import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'
import { revalidatePath } from 'next/cache'

export async function deleteUser(id: string): Promise<{ success: boolean; message: string }> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    const result = await response.json()

    return {
      success: result.success,
      message: 'Berhasil menghapus user',
    }
  } else {
    throw new Error('Gagal menghapus user')
  }
}
