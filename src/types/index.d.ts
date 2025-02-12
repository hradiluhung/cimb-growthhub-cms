declare type Profile = {
  id: string
  nama: string
  email: string
  userId: string
  tanggalLahir: string
  pekerjaan: string
  perusahaan: string
  noTelp: string
  role: 'hr' | 'karyawan' | 'trainee'
}

declare type Training = {
  id: string
  nama: string
  namaTrainer: string
  kapasitas: number
  tipe: 'public' | 'private'
  deskripsi: string
  tanggal: string
  durasi: number
  status: 'onprogress' | 'done'
}
