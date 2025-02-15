declare type User = {
  id: string
  username: string
  role_id: string
  created_at: string
  updated_at: string
  role: Role
  profile: Profile | null
}

declare type Role = {
  id: string
  name: string
  created_at: string
  updated_at: string
}

declare type Profile = {
  id: string
  user_id: string
  nama: string
  tgl_lahir: string
  pekerjaan: string
  perusahaan: string
  no_telepon: string
  email: string
  created_at: string
  updated_at: string
}

declare type Training = {
  id: string
  nama: string
  nama_trainer: string
  kapasitas: number
  kapasitas_tersisa: number
  tipe: 'public' | 'private'
  deskripsi: string
  tanggal: string
  durasi: number
  status: 'on progress' | 'done'
}

declare type Attendee = {
  id: string
  user_id: string
  training_id: string
  status: 'pending' | 'approved' | 'rejected'
  tgl_daftar: string
  created_at: string
  updated_at: string
  user: User
}

