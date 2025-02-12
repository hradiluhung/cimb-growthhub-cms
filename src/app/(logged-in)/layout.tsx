import Sidebar from '@/components/common/sidebar'
import React from 'react'

export default function UserLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="p-4 md:p-8 lg:p-16 h-full overflow-y-auto w-full">{children}</div>
    </div>
  )
}
