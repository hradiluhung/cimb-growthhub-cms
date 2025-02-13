'use client'
import { getPesertaByTrainingId } from '@/lib/actions/peserta/get-peserta-by-training-id'
import { getTrainingById } from '@/lib/actions/training/get-training-by-id'
import { useCallback, useEffect, useState } from 'react'
import BackButton from '../common/back-button'
import { Skeleton } from '../ui/skeleton'
import { CalendarIcon, Mic2, Timer, Users } from 'lucide-react'
import { notFound } from 'next/navigation'
import { formatDate } from '@/lib/utils'
import TrainingStatusBadge from './training-status-badge'
import TrainingTypeBadge from './training-type-badge'
import TrainingPesertaListDialog from './training-peserta-list-dialog'
import TrainingPesertaPendingCard from './training-peserta-pending-card'

export default function TrainingDetail({ id }: { id: string }) {
  const [loading, setLoading] = useState(true)
  const [training, setTraining] = useState<Training | null>()
  const [attendees, setAttendees] = useState<Attendee[] | undefined>(undefined)

  const fetchData = useCallback(async () => {
    const trainingData = await getTrainingById(id)

    const attendeesData = await getPesertaByTrainingId(trainingData.id)

    setTraining(trainingData)
    setAttendees(attendeesData)

    setLoading(false)
  }, [id])

  useEffect(() => {
    fetchData()
  }, [fetchData, id])

  if (training === null && loading === false) {
    notFound()
  }

  if (loading) {
    return (
      <div className="flex flex-col gap-8">
        <div className="flex gap-2">
          <Skeleton className="w-8 h-8" />
          <div className="space-y-1">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-48 h-8" />
            <div className="flex items-center gap-1 text-gray-500">
              <Skeleton className="w-4 h-4" />
              <Skeleton className="w-24 h-4" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <Skeleton className="w-full h-20" />
            <div className="flex items-center gap-2 flex-wrap text-gray-500">
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
              <div className="flex items-center gap-1">
                <Skeleton className="w-4 h-4" />
                <Skeleton className="w-20 h-4" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="w-20 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Skeleton className="w-32 h-6" />
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-4">
                <Skeleton className="w-48 h-6" />
                <div className="flex flex-col gap-2">
                  <Skeleton className="w-full h-12" />
                  <Skeleton className="w-full h-12" />
                </div>
              </div>
              <Skeleton className="w-full h-12" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (training && !loading)
    return (
      <div className="flex flex-col gap-8">
        <div className="flex gap-2">
          <BackButton />
          <div>
            <p>Detail Training</p>
            <h1 className="font-bold text-2xl text-primary">{training.nama}</h1>
            <div className="flex items-center gap-1 text-gray-500">
              <Mic2 className="size-4" />
              <p className="text-sm">{training.nama_trainer}</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="flex flex-col gap-4">
            <p>{training.deskripsi}</p>
            <div className="flex items-center gap-2 flex-wrap text-gray-500">
              <div className="flex items-center gap-1">
                <CalendarIcon className="size-4" />
                <p className="text-xs">
                  {training.tanggal && formatDate(new Date(training.tanggal))}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Timer className="size-4" />
                <p className="text-xs">{training.durasi} menit</p>
              </div>
              <div className="flex items-center gap-1">
                <Users className="size-4" />
                <p className="text-xs">{training.kapasitas} orang</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <TrainingStatusBadge status={training.status} />
              <TrainingTypeBadge type={training.tipe} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h1 className="font-bold text-lg text-primary">Peserta</h1>
            {attendees === undefined ? (
              <div>Belum ada peserta mendaftar</div>
            ) : (
              attendees && (
                <div className="flex flex-col gap-8">
                  {attendees.some((p) => p.status === 'pending') && (
                    <div className="flex flex-col gap-4">
                      <h2>Membutuhkan persetujuan</h2>
                      <div className="flex flex-col gap-2">
                        {attendees
                          .filter((p) => p.status === 'pending')
                          .map((peserta) => (
                            <TrainingPesertaPendingCard
                              key={peserta.id}
                              trainingId={training.id}
                              peserta={peserta}
                              onUpdate={fetchData}
                            />
                          ))}
                      </div>
                    </div>
                  )}
                  <TrainingPesertaListDialog
                    trainingId={training.id}
                    peserta={attendees}
                    onUpdate={fetchData}
                  />
                </div>
              )
            )}
          </div>
        </div>
      </div>
    )
}
