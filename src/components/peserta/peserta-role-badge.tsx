import React from 'react'

export default function PesertaRoleBadge({ role }: { role: 'employee' | 'trainee' }) {
  return (
    <>
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          role === 'employee' ? 'bg-blue-100 text-blue-500' : 'bg-yellow-100 text-orange-500'
        }`}
      >
        {role === 'employee' ? 'Karyawan' : 'Non-karyawan'}
      </span>
    </>
  )
}
