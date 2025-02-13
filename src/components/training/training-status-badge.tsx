import React from 'react'

export default function TrainingStatusBadge({ status }: { status: 'on progress' | 'done' }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        status === 'on progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
      }`}
    >
      {status === 'on progress' ? 'Berlangsung' : 'Selesai'}
    </span>
  )
}
