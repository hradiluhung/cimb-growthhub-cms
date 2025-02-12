import DashboardCards from '@/components/admin/admin-dashboard-cards'
import React from 'react'

export default function DashboardAdminPage() {
  return (
    <div className="flex flex-col gap-8 lg:p-24">
      <div>
        <h1 className="font-bold text-4xl text-primary">Selamat Datang, Admin!</h1>
        <p>Berikut adalah rekapan data yang ada di CIMB GrowthHub</p>
      </div>
      <DashboardCards />
    </div>
  )
}
