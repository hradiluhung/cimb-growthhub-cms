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
  const trainings: Training[] = useMemo(
    () => [
      {
        id: '1e7b1d9e-8f3d-4c3b-9b1e-1d9e8f3d4c3b',
        nama: 'React Basics',
        namaTrainer: 'John Doe',
        kapasitas: 30,
        tipe: 'public',
        deskripsi: 'Introduction to React',
        tanggal: '2023-10-01',
        durasi: 3,
        status: 'done',
      },
      {
        id: '2a7b1d9e-8f3d-4c3b-9b1e-2d9e8f3d4c3b',
        nama: 'Advanced TypeScript',
        namaTrainer: 'Jane Smith',
        kapasitas: 20,
        tipe: 'private',
        deskripsi: 'Deep dive into TypeScript',
        tanggal: '2023-10-05',
        durasi: 2,
        status: 'onprogress',
      },
      {
        id: '3b7b1d9e-8f3d-4c3b-9b1e-3d9e8f3d4c3b',
        nama: 'Node.js Fundamentals',
        namaTrainer: 'Alice Johnson',
        kapasitas: 25,
        tipe: 'public',
        deskripsi: 'Learn the basics of Node.js',
        tanggal: '2023-10-10',
        durasi: 4,
        status: 'done',
      },
      {
        id: '4c7b1d9e-8f3d-4c3b-9b1e-4d9e8f3d4c3b',
        nama: 'CSS for Beginners',
        namaTrainer: 'Bob Brown',
        kapasitas: 15,
        tipe: 'public',
        deskripsi: 'Introduction to CSS',
        tanggal: '2023-10-15',
        durasi: 1,
        status: 'done',
      },
      {
        id: '5d7b1d9e-8f3d-4c3b-9b1e-5d9e8f3d4c3b',
        nama: 'Python Data Science',
        namaTrainer: 'Carol White',
        kapasitas: 35,
        tipe: 'private',
        deskripsi: 'Data science with Python',
        tanggal: '2023-10-20',
        durasi: 5,
        status: 'onprogress',
      },
    ],
    []
  )

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
