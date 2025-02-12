import HrBanner from '@/components/hr/hr-banner'
import HRDashboardTrainings from '@/components/hr/hr-dashboard-trainings'
import React from 'react'

export default function DashboardHRPage() {
  return (
    <div className="flex flex-col gap-8 lg:pt-16 lg:px-16">
      <HrBanner />
      <HRDashboardTrainings />
    </div>
  )
}
