'use server'

export default async function createTraining({
  nama,
  nama_trainer,
  kapasitas,
  tipe,
  deskripsi,
  tanggal,
  durasi,
}: {
  nama: string
  nama_trainer: string
  kapasitas: number
  tipe: string
  deskripsi: string
  tanggal: Date
  durasi: number
}) {
  // TODO: Implement create user
  console.log(nama, nama_trainer, kapasitas, tipe, deskripsi, tanggal, durasi)

  return 'User created'
}
