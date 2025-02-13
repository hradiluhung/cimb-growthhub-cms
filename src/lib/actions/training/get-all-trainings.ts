'use server'

import { BASE_URL } from '@/lib/constants'

export async function getAllTrainings(): Promise<Training[]> {
  const response = await fetch(`${BASE_URL}/trainings`, {
    method: 'GET',
  })

  if (response.ok) {
    const result = await response.json()

    const trainings = result.data
    return trainings
  } else {
    throw new Error('Gagal mengambil data training')
  }
}
