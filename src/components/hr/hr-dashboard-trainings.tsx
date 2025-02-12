import React from 'react'
import TrainingStatCard from '../training/training-stat-card'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import TrainingCard from '../training/training-card'

export default function HRDashboardTrainings() {
  const trainings: Training[] = [
    {
      id: '1e7b1d9e-8f3d-4c3b-9b1e-1d9e8f3d4c3b',
      nama: 'React Basics',
      namaTrainer: 'John Doe',
      kapasitas: 30,
      tipe: 'public',
      deskripsi: 'Introduction to React',
      tanggal: '2023-10-01',
      durasi: 3,
      status: 'done',
    },
    {
      id: '2a7b1d9e-8f3d-4c3b-9b1e-2d9e8f3d4c3b',
      nama: 'Advanced TypeScript',
      namaTrainer: 'Jane Smith',
      kapasitas: 20,
      tipe: 'private',
      deskripsi: 'Deep dive into TypeScript',
      tanggal: '2023-10-05',
      durasi: 2,
      status: 'onprogress',
    },
  ]

  return (
    <div className="flex gap-8 items-stretch">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg text-primary">Statistik Training</h2>
        <Link href="hr/trainings">
          <TrainingStatCard total={50} onprogress={10} completed={40} />
        </Link>
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg text-primary">Training Terbaru</h2>
          <Link href="hr/trainings" className="text-sm text-primary flex items-center group">
            Lainnya
            <span className="ml-1 transition-transform transform group-hover:translate-x-1 group-focus-within:translate-x-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
        <div className="flex gap-4 flex-1">
          {trainings.map((training, index) => (
            <Link key={index} className="flex-1" href={`hr/trainings/${training.id}`}>
              <TrainingCard key={index} training={training} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
