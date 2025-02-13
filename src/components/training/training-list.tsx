'use client'
import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../common/search-bar'
import SwitchModeButton from '../common/switch-mode-button'
import { DataTable } from '../common/data-table'
import { trainingColumns } from './training-columns'
import TrainingGrid from './training-grid'
import { useToast } from '@/hooks/use-toast'
import { getAllTrainings } from '@/lib/actions/training/get-all-trainings'

export default function TrainingList() {
  const { toast } = useToast()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [trainings, setTrainings] = useState<Training[]>([])
  const [filteredTrainings, setFilteredTrainings] = useState<Training[]>([])
  const [loading, setLoading] = useState(true)

  function onDeleted(id: string) {
    setFilteredTrainings((prev) => prev.filter((training) => training.id !== id))
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const trainings = await getAllTrainings()

        setTrainings(trainings)
        setFilteredTrainings(trainings)
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

  useEffect(() => {
    setFilteredTrainings(
      trainings.filter((training) =>
        training.nama.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    )
  }, [searchKeyword, trainings])

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex items-stretch gap-2">
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder="Cari training"
        />
        <SwitchModeButton viewMode={viewMode} setViewMode={setViewMode} />
      </div>
      {viewMode === 'grid' ? (
        <TrainingGrid trainings={filteredTrainings} />
      ) : loading ? (
        <DataTable.Skeleton columns={trainingColumns()} rows={10} />
      ) : (
        <DataTable columns={trainingColumns(onDeleted)} data={filteredTrainings} />
      )}
    </div>
  )
}
