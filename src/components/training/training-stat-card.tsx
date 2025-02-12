import { BookText } from 'lucide-react'
import React from 'react'

export default function TrainingStatCard({
  total,
  onprogress,
  completed,
}: {
  total: number
  onprogress: number
  completed: number
}) {
  return (
    <div className="rounded-lg p-6 bg-primary md:w-64 lg:w-72 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <div className="font-bold text-3xl text-white">{total}</div>
          <div className="text-sm text-white/80">Total Training</div>
        </div>
        <div className="rounded-full bg-white/20 p-2">
          <BookText className="size-5 text-white" />
        </div>
      </div>
      <div className="mt-4 flex">
        <div className="flex justify-between gap-6">
          <div>
            <div className="font-bold text-xl text-white">{onprogress}</div>
            <div className="text-sm text-white/80">Berlangsung</div>
          </div>
          <div>
            <div className="font-bold text-xl text-white">{completed}</div>
            <div className="text-sm text-white/80">Selesai</div>
          </div>
        </div>
      </div>
    </div>
  )
}
