import React from 'react'

export default function TrainingTypeBadge({ type }: { type: 'public' | 'private' }) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs ${
        type === 'public' ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
      }`}
    >
      {type === 'public' ? 'Public' : 'Private'}
    </span>
  )
}
