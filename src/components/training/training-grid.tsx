import Link from 'next/link'
import React from 'react'
import TrainingCard from './training-card'

export default function TrainingGrid({ trainings }: { trainings: Training[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {trainings.map((training) => (
        <Link key={training.id} className="flex-1" href={`trainings/${training.id}`}>
          <TrainingCard training={training} />
        </Link>
      ))}
    </div>
  )
}
