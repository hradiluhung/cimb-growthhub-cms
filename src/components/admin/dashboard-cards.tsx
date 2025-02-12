import { BookText, Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function DashboardCards() {
  // TODO: get real data from API
  const data = {
    user: {
      total: 100,
      hr: 10,
      employee: 50,
      trainee: 40,
    },
    trainings: {
      total: 50,
      upcoming: 10,
      completed: 40,
    },
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Link href="/admin/users">
        <div className="bg-white rounded-lg p-6 border border-primary/20 md:w-64 lg:w-72 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-3xl">{data.user.total}</div>
              <div className="text-sm text-gray-500">Total Pengguna</div>
            </div>
            <div className="rounded-full bg-primary/10 p-2">
              <Users className="size-5 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex">
            <div className="flex justify-between gap-6">
              <div>
                <div className="font-bold text-xl">{data.user.hr}</div>
                <div className="text-sm text-gray-500">HR</div>
              </div>
              <div>
                <div className="font-bold text-xl">{data.user.employee}</div>
                <div className="text-sm text-gray-500">Karyawan</div>
              </div>
              <div>
                <div className="font-bold text-xl">{data.user.trainee}</div>
                <div className="text-sm text-gray-500">Trainee</div>
              </div>
            </div>
          </div>
        </div>
      </Link>

      <Link href="/admin/trainings">
        <div className="rounded-lg p-6 bg-primary md:w-64 lg:w-72 hover:translate-y-[-5px] transition-all duration-300 hover:shadow-md">
          <div className="flex justify-between items-start">
            <div>
              <div className="font-bold text-3xl text-white">{data.trainings.total}</div>
              <div className="text-sm text-white/80">Total Training</div>
            </div>
            <div className="rounded-full bg-white/10 p-2">
              <BookText className="size-5 text-white" />
            </div>
          </div>
          <div className="mt-4 flex">
            <div className="flex justify-between gap-6">
              <div>
                <div className="font-bold text-xl text-white">{data.trainings.upcoming}</div>
                <div className="text-sm text-white/80">Berlangsung</div>
              </div>
              <div>
                <div className="font-bold text-xl text-white">{data.trainings.completed}</div>
                <div className="text-sm text-white/80">Selesai</div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
