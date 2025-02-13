import React from 'react'

export default function PesertaRoleBadge({ role }: { role: 'karyawan' | 'trainee' }) {
  return (
    <>
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          role === 'karyawan' ? 'bg-blue-100 text-blue-500' : 'bg-yellow-100 text-orange-500'
        }`}
      >
        {role === 'karyawan' ? 'Karyawan' : 'Non-karyawan'}
      </span>
    </>
  )
}
