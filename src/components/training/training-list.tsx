'use client'
import { useEffect, useMemo, useState } from 'react'
import SearchBar from '../common/search-bar'
import SwitchModeButton from '../common/switch-mode-button'
import { DataTable } from '../common/data-table'
import { trainingColumns } from './training-columns'
import TrainingGrid from './training-grid'

export default function TrainingList() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [filteredData, setFilteredData] = useState<Training[]>([])

  //   TODO: Fetch data from API
  const trainings: Training[] = useMemo(() => [], [])

  useEffect(() => {
    setFilteredData(
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
        <TrainingGrid trainings={filteredData} />
      ) : (
        <DataTable columns={trainingColumns} data={filteredData} />
      )}
    </div>
  )
}
