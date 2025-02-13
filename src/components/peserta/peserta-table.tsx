'use client'
import { useEffect, useState } from 'react'
import { DataTable } from '../common/data-table'
import SearchBar from '../common/search-bar'
import { pesertaColumns } from './peserta-columns'

export default function PesertaTable({
  onUpdate,
  trainingId,
  peserta,
}: {
  onUpdate: () => void
  trainingId: string
  peserta: Attendee[]
}) {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filteredData, setFilteredData] = useState<Attendee[]>([])

  useEffect(() => {
    const filtered = peserta.filter((user) => {
      return Object.values(user).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchKeyword.toLowerCase())
        }
        return false
      })
    })
    setFilteredData(filtered)
  }, [peserta, searchKeyword])

  return (
    <div className="flex flex-col gap-4 mt-8">
      <div>
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder="Cari nama"
        />
      </div>
      <DataTable columns={pesertaColumns(trainingId, onUpdate)} data={filteredData} />
    </div>
  )
}
