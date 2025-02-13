import TrainingList from '@/components/training/training-list'
import React from 'react'

export default function AdminTrainingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-primary">Daftar Training</h1>
          <p>Training yang telah terdaftar pada aplikasi</p>
        </div>
      </div>
      <TrainingList />
    </div>
  )
}
