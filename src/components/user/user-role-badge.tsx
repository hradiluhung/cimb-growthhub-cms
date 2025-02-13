import React from 'react'

export default function UserRoleBadge({ role }: { role: 'hr' | 'employee' | 'trainee' }) {
  return (
    <>
      <span
        className={`px-2 py-1 text-xs rounded-full ${
          role === 'hr'
            ? 'bg-blue-100 text-blue-800'
            : role === 'employee'
            ? 'bg-green-100 text-green-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {role === 'hr' ? 'HR' : role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    </>
  )
}
