'use client'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import TrainingCard from '../training/training-card'
import TrainingStatCard from '../training/training-stat-card'
import { useEffect, useState } from 'react'
import { getAllTrainings } from '@/lib/actions/training/get-all-trainings'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '../ui/skeleton'

export default function HRDashboardTrainings() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [totalTrainings, setTotalTrainings] = useState({
    total: 0,
    onprogress: 0,
    completed: 0,
  })
  const [latestTrainings, setLatestTrainings] = useState<Training[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const trainings = await getAllTrainings()

        const totalTraining = trainings.length
        const onprogress = trainings.filter((training) => training.status === 'on progress').length
        const completed = trainings.filter((training) => training.status === 'done').length

        setTotalTrainings({ total: totalTraining, onprogress, completed })

        const latest = trainings.slice(0, 2)
        setLatestTrainings(latest)
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
    <div className="flex gap-8 items-stretch">
      <div className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg text-primary">Statistik Training</h2>
        {loading ? (
          <Skeleton className="h-40 w-full md:w-64 lg:w-72" />
        ) : (
          <Link href="hr/trainings">
            <TrainingStatCard
              total={totalTrainings.total}
              onprogress={totalTrainings.onprogress}
              completed={totalTrainings.completed}
            />
          </Link>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-lg text-primary">Training Terbaru</h2>
          <Link href="hr/trainings" className="text-sm text-primary flex items-center group">
            Lainnya
            <span className="ml-1 transition-transform transform group-hover:translate-x-1 group-focus-within:translate-x-1 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
        <div className="flex gap-4 flex-1">
          {loading ? (
            <>
              <Skeleton className="h-40 w-full" />
              <Skeleton className="h-40 w-full" />
            </>
          ) : (
            latestTrainings.map((training, index) => (
              <Link key={index} className="flex-1" href={`hr/trainings/${training.id}`}>
                <TrainingCard training={training} />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
