'use server'

import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'
import { normalizeDateTime } from '@/lib/utils'

export default async function createTraining({
  nama,
  nama_trainer,
  kapasitas,
  tipe,
  deskripsi,
  tanggal,
  durasi,
  status,
}: {
  nama: string
  nama_trainer: string
  kapasitas: number
  tipe: string
  deskripsi: string
  tanggal: Date
  durasi: number
  status: string
}): Promise<{ success: boolean; message: string }> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const data = JSON.stringify({
    nama,
    nama_trainer,
    kapasitas,
    tipe,
    deskripsi,
    tanggal: normalizeDateTime(tanggal),
    durasi,
    status,
  })

  const response = await fetch(`${BASE_URL}/trainings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: data,
  })

  if (response.ok) {
    const result = await response.json()

    return {
      success: result.success,
      message: result.message,
    }
  } else {
    throw new Error('Gagal membuat training')
  }
}
