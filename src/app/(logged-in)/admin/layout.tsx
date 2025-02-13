import { getSessionRole } from '@/lib/auth/session'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const role = await getSessionRole()

  if (role !== 'admin') {
    redirect('/')
  }

  return <>{children}</>
}
