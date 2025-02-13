'use server'

import { BASE_URL } from '@/lib/constants'
import { string } from 'zod'

export async function getTrainingById(id: string): Promise<Training> {
  const response = await fetch(`${BASE_URL}/trainings/${id}`, {
    method: 'GET',
  })

  if (response.ok) {
    const result = await response.json()

    const training = result.data
    return training
  } else {
    throw new Error('Gagal mengambil data training')
  }
}
