import React from 'react'

export default function UserRoleBadge({ role }: { role: 'hr' | 'karyawan' | 'trainee' }) {
  return (
    <>
      {role === 'hr' && (
        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full">HR</span>
      )}
      {role === 'karyawan' && (
        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full">Karyawan</span>
      )}
      {role === 'trainee' && (
        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full">Trainee</span>
      )}
    </>
  )
}
