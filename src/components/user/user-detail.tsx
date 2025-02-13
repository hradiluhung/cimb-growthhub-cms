'use client'
import { getUserById } from '@/lib/actions/users/get-user-by-id'
import { useEffect, useState } from 'react'
import BackButton from '../common/back-button'
import PesertaRoleBadge from '../peserta/peserta-role-badge'
import { Skeleton } from '../ui/skeleton'

export default function UserDetail({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const user = await getUserById(id)

      setUser(user)
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex gap-2">
          <Skeleton className="w-24 h-5" />
          <div className="space-y-2">
            <Skeleton className="w-48 h-7" />
            <Skeleton className="w-72 h-10" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-36 h-5" />
            <Skeleton className="w-64 h-7" />
            <Skeleton className="w-36 h-5" />
            <Skeleton className="w-64 h-7" />
            <Skeleton className="w-36 h-5" />
            <Skeleton className="w-64 h-7" />
            <Skeleton className="w-36 h-5" />
            <Skeleton className="w-64 h-7" />
            <Skeleton className="w-36 h-5" />
            <Skeleton className="w-64 h-7" />
          </div>
          <div className="flex items-center justify-center">
            <Skeleton className="w-72 h-72 rounded-full" />
          </div>
        </div>
      </div>
    )
  }

  if (user)
    return (
      <div className="flex flex-col gap-8">
        <div className="flex gap-2">
          <BackButton />
          <div>
            <p>Detail Attendee</p>
            <h1 className="font-bold text-2xl text-primary">{user?.profile?.nama}</h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm text-gray-500">Pekerjaan</p>
              <p className="text-lg">{user?.profile?.pekerjaan}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Perusahaan</p>
              <p className="text-lg">{user?.profile?.perusahaan}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Role</p>
              <div>
                <PesertaRoleBadge role={user?.role.name as 'employee' | 'trainee'} />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img src="/hr.png" alt="HR" className="w-72 object-cover rounded-full" />
          </div>
        </div>
      </div>
    )
}
