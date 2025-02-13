import { formatDate } from '@/lib/utils'
import { CalendarIcon, Mic2, Timer, Users } from 'lucide-react'
import React from 'react'
import TrainingStatusBadge from './training-status-badge'

export default function TrainingCard({ training }: { training: Training }) {
  return (
    <div className="flex-1 bg-white rounded-lg border border-primary/20 overflow-hidden hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md cursor-pointer">
      <img
        src={`/learning-banner ${Math.floor(Math.random() * 3) + 1}.jpg`}
        alt="Learning Banner"
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg text-primary flex-1">{training.nama}</h3>
          <TrainingStatusBadge status={training.status} />
        </div>
        <div className="mt-1 text-gray-500">
          <div className="flex items-center gap-1">
            <Mic2 className="size-4" />
            <p className="text-xs">{training.nama_trainer}</p>
          </div>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
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
        </div>
      </div>
    </div>
  )
}
