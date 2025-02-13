'use server'

import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'

export async function rejectPeserta(
  pesertaId: string,
  trainingId: string
): Promise<{ success: boolean; message: string }> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const data = JSON.stringify({
    status: 'rejected',
  })

  const response = await fetch(`${BASE_URL}/trainings/${pesertaId}/requests/${trainingId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })

  console.log('RESPONSE', response)

  if (response.ok) {
    const result = await response.json()

    return {
      success: result.success,
      message: result.message,
    }
  } else {
    throw new Error('Gagal reject pendaftar')
  }
}
