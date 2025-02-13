'use server'
import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'
import { revalidatePath } from 'next/cache'

export async function deleteTraining(id: string): Promise<{ success: boolean; message: string }> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const response = await fetch(`${BASE_URL}/trainings/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    const result = await response.json()

    return {
      success: result.success,
      message: result.message,
    }
  } else {
    throw new Error('Gagal menghapus training')
  }
}
