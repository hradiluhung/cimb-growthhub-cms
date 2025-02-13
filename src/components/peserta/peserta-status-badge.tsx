import React from 'react'

export default function PesertaStatusBadge({
  status,
}: {
  status: 'pending' | 'approved' | 'rejected'
}) {
  return (
    <>
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          status === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : status === 'approved'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    </>
  )
}
