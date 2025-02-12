import { Button } from '@/components/ui/button'
import UserTable from '@/components/users/user-table'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function AdminUsersPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-bold text-2xl text-primary">Daftar User</h1>
          <p>User terdaftar pada aplikasi</p>
        </div>
        <Button asChild>
          <Link href="/admin/users/add" className="flex items-center gap-1">
            <Plus className="size-5" />
            Tambah
          </Link>
        </Button>
      </div>
      <div>
        <UserTable />
      </div>
    </div>
  )
}
