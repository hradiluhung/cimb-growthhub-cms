import BackButton from '@/components/common/back-button'
import TrainingPesertaListDialog from '@/components/training/training-peserta-list-dialog'
import TrainingPesertaPendingCard from '@/components/training/training-peserta-pending-card'
import TrainingStatusBadge from '@/components/training/training-status-badge'
import TrainingTypeBadge from '@/components/training/training-type-badge'
import { formatDate } from '@/lib/utils'
import { ArrowRight, CalendarIcon, Mic2, Timer, Users } from 'lucide-react'
import React from 'react'

export default async function TrainingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  // TODO: fetch real data
  const training: Training = {
    id: '1e7b1d9e-8f3d-4c3b-9b1e-1d9e8f3d4c3b',
    nama: 'React Basics',
    namaTrainer: 'John Doe',
    kapasitas: 30,
    tipe: 'public',
    deskripsi:
      'Introduction to React, covering the fundamental concepts and features of the library. This training will help you understand how to build user interfaces using React components, manage state and props, and handle events. You will also learn about the React lifecycle methods, hooks, and how to work with external data sources. By the end of this training, you will have a solid foundation to start building your own React applications.',
    tanggal: '2023-10-01',
    durasi: 3,
    status: 'done',
  }

  // TODO: fetch real data
  const peserta: Peserta[] = [
    {
      id: '1',
      userId: 'u1',
      trainingId: id,
      nama: 'Alice Johnson',
      pekerjaan: 'Software Engineer',
      perusahaan: 'Tech Corp',
      status: 'approved',
      tanggalDaftar: '2023-09-15',
      role: 'karyawan',
    },
    {
      id: '2',
      userId: 'u2',
      trainingId: id,
      nama: 'Bob Smith',
      pekerjaan: 'Product Manager',
      perusahaan: 'Innovate Ltd',
      status: 'pending',
      tanggalDaftar: '2023-09-16',
      role: 'trainee',
    },
    {
      id: '3',
      userId: 'u3',
      trainingId: id,
      nama: 'Charlie Brown',
      pekerjaan: 'UX Designer',
      perusahaan: 'Design Studio',
      status: 'approved',
      tanggalDaftar: '2023-09-17',
      role: 'karyawan',
    },
    {
      id: '4',
      userId: 'u4',
      trainingId: id,
      nama: 'Diana Prince',
      pekerjaan: 'Data Scientist',
      perusahaan: 'DataWorks',
      status: 'pending',
      tanggalDaftar: '2023-09-18',
      role: 'karyawan',
    },
    {
      id: '5',
      userId: 'u5',
      trainingId: id,
      nama: 'Ethan Hunt',
      pekerjaan: 'DevOps Engineer',
      perusahaan: 'Cloud Solutions',
      status: 'approved',
      tanggalDaftar: '2023-09-19',
      role: 'karyawan',
    },
  ]

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <BackButton />
        <div>
          <p>Detail Training</p>
          <h1 className="font-bold text-2xl text-primary">{training.nama}</h1>
          <div className="flex items-center gap-1 text-gray-500">
            <Mic2 className="size-4" />
            <p className="text-sm">{training.namaTrainer}</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="flex flex-col gap-4">
          <p>{training.deskripsi}</p>
          <div className="flex items-center gap-2 flex-wrap text-gray-500">
            <div className="flex items-center gap-1">
              <CalendarIcon className="size-4" />
              <p className="text-xs">{formatDate(new Date(training.tanggal))}</p>
            </div>
            <div className="flex items-center gap-1">
              <Timer className="size-4" />
              <p className="text-xs">{training.durasi} menit</p>
            </div>
            <div className="flex items-center gap-1">
              <Users className="size-4" />
              <p className="text-xs">{training.kapasitas} orang</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <TrainingStatusBadge status={training.status} />
            <TrainingTypeBadge type={training.tipe} />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="font-bold text-lg text-primary">Peserta</h1>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <h2>Membutuhkan persetujuan</h2>
              <div className="flex flex-col gap-2">
                {peserta
                  .filter((p) => p.status === 'pending')
                  .map((peserta) => (
                    <TrainingPesertaPendingCard key={peserta.id} peserta={peserta} />
                  ))}
              </div>
            </div>
            <TrainingPesertaListDialog peserta={peserta} />
          </div>
        </div>
      </div>
    </div>
  )
}
