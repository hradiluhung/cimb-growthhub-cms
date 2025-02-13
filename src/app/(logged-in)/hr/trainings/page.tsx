import TrainingList from '@/components/training/training-list'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function HRTrainingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-primary">Daftar Training</h1>
          <p>Training yang telah terdaftar pada aplikasi</p>
        </div>
        <Button asChild>
          <Link href="/hr/trainings/add" className="flex items-center gap-1">
            <Plus className="size-5" />
            Tambah
          </Link>
        </Button>
      </div>
      <TrainingList />
    </div>
  )
}
