import BackButton from '@/components/common/back-button'
import TrainingForm from '@/components/training/training-form'
import React from 'react'

export default function AddTrainingPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <BackButton />
        <div>
          <h1 className="font-bold text-2xl text-primary">Tambah Training</h1>
          <p>Tambahkan training baru untuk memberikan pelatihan kepada karyawan atau umum.</p>
        </div>
      </div>
      <div className="md:px-8 lg:px-12">
        <TrainingForm />
      </div>
    </div>
  )
}
