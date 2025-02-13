'use server'

import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'

export async function getPesertaByTrainingId(id: string): Promise<Attendee[] | undefined> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const response = await fetch(`${BASE_URL}/trainings/${id}/requests`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  if (response.ok) {
    const result = await response.json()

    const attendees = result.data.attendees
    return attendees
  } else {
    throw new Error('Gagal mengambil data peserta')
  }
}
