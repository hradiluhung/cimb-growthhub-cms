'use client'
import { useToast } from '@/hooks/use-toast'
import { getAllUsers } from '@/lib/actions/users/get-all-users'
import { Users } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import TrainingStatCard from '../training/training-stat-card'
import { Skeleton } from '../ui/skeleton'
import { getAllTrainings } from '@/lib/actions/training/get-all-trainings'

export default function DashboardCards() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [totalUsers, setTotalUsers] = useState({
    total: 0,
    hr: 0,
    employee: 0,
    trainee: 0,
  })
  const [totalTrainings, setTotalTrainings] = useState({
    total: 0,
    onprogress: 0,
    completed: 0,
  })

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const users = await getAllUsers()
        const trainings = await getAllTrainings()
        const filteredUsers = users.filter((user) => user.role.name !== 'admin')

        const totalUser = filteredUsers.length
        const hr = filteredUsers.filter((user) => user.role.name === 'hr').length
        const employee = filteredUsers.filter((user) => user.role.name === 'employee').length
        const trainee = filteredUsers.filter((user) => user.role.name === 'trainee').length

        const totalTraining = trainings.length
        const onprogress = trainings.filter((training) => training.status === 'on progress').length
        const completed = trainings.filter((training) => training.status === 'done').length

        setTotalUsers({ total: totalUser, hr, employee, trainee })
        setTotalTrainings({ total: totalTraining, onprogress, completed })
      } catch (error: any) {
        toast({
          title: 'Gagal mengambil data',
          description: error.message,
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [toast])

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {loading ? (
        <>
          <Skeleton className="h-40 w-full md:w-64 lg:w-72" />
          <Skeleton className="h-40 w-full md:w-64 lg:w-72" />
        </>
      ) : (
        <>
          <Link href="/admin/users">
            <div className="bg-white rounded-lg p-6 border border-primary/20 md:w-64 lg:w-72 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-3xl">{totalUsers.total}</div>
                  <div className="text-sm text-gray-500">Total Pengguna</div>
                </div>
                <div className="rounded-full bg-primary/20 p-2">
                  <Users className="size-5 text-primary" />
                </div>
              </div>
              <div className="mt-4 flex">
                <div className="flex justify-between gap-6">
                  <div>
                    <div className="font-bold text-xl">{totalUsers.hr}</div>
                    <div className="text-sm text-gray-500">HR</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl">{totalUsers.employee}</div>
                    <div className="text-sm text-gray-500">Karyawan</div>
                  </div>
                  <div>
                    <div className="font-bold text-xl">{totalUsers.trainee}</div>
                    <div className="text-sm text-gray-500">Trainee</div>
                  </div>
                </div>
              </div>
            </div>
          </Link>

          <Link href="/admin/trainings">
            <TrainingStatCard
              total={totalTrainings.total}
              onprogress={totalTrainings.onprogress}
              completed={totalTrainings.completed}
            />
          </Link>
        </>
      )}
    </div>
  )
}
