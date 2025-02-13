'use server'

export default async function createTraining({
  nama,
  namaTrainer,
  kapasitas,
  tipe,
  deskripsi,
  tanggal,
  durasi,
}: {
  nama: string
  namaTrainer: string
  kapasitas: number
  tipe: string
  deskripsi: string
  tanggal: Date
  durasi: number
}) {
  // TODO: Implement create user
  console.log(nama, namaTrainer, kapasitas, tipe, deskripsi, tanggal, durasi)

  return 'User created'
}
