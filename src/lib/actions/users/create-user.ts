'use server'
import { getToken } from '@/lib/auth/session'
import { BASE_URL } from '@/lib/constants'

export default async function createUser({
  nama,
  tgl_lahir,
  password,
  pekerjaan,
  perusahaan,
  no_telepon,
  email,
  username,
  role_id,
}: {
  nama: string
  password: string
  tgl_lahir: Date
  pekerjaan: string
  perusahaan: string
  no_telepon: string
  email: string
  username: string
  role_id: string
}): Promise<{ success: boolean; message: string }> {
  const token = await getToken()

  if (!token) {
    throw new Error('Silakan login terlebih dahulu')
  }

  const data = JSON.stringify({
    nama,
    tgl_lahir,
    password,
    pekerjaan,
    perusahaan,
    no_telepon,
    email,
    username,
    role_id,
  })

  const response = await fetch(`${BASE_URL}/users`, {
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
    throw new Error(response.statusText)
  }
}
