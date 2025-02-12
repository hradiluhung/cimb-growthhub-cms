'use server'

export default async function createUser({
  nama,
  tanggalLahir,
  pekerjaan,
  perusahaan,
  noTelp,
  email,
  username,
  role,
}: {
  nama: string
  tanggalLahir: Date
  pekerjaan: string
  perusahaan: string
  noTelp: string
  email: string
  username: string
  role: string
}) {
  // TODO: Implement create user
  console.log(nama, tanggalLahir, pekerjaan, perusahaan, noTelp, email, username, role)

  return 'User created'
}
