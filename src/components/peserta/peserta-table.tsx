'use client'
import React, { useEffect, useMemo, useState } from 'react'
import SearchBar from '../common/search-bar'
import { DataTable } from '../common/data-table'
import { pesertaColumns } from './peserta-columns'

export default function PesertaTable() {
  // TODO: fetch real data
  const peserta: Peserta[] = useMemo(
    () => [
      {
        id: '1',
        userId: 'u1',
        trainingId: '21312-123123-124jdoa1',
        nama: 'Alice Johnson',
        pekerjaan: 'Software Engineer',
        perusahaan: 'Tech Corp',
        status: 'approved',
        tanggalDaftar: '2023-09-15',
        role: 'karyawan',
      },
      {
        id: '2',
        userId: 'u2',
        trainingId: '21312-123123-124jdoa1',
        nama: 'Bob Smith',
        pekerjaan: 'Product Manager',
        perusahaan: 'Innovate Ltd',
        status: 'pending',
        tanggalDaftar: '2023-09-16',
        role: 'trainee',
      },
      {
        id: '3',
        userId: 'u3',
        trainingId: '21312-123123-124jdoa1',
        nama: 'Charlie Brown',
        pekerjaan: 'UX Designer',
        perusahaan: 'Design Studio',
        status: 'approved',
        tanggalDaftar: '2023-09-17',
        role: 'karyawan',
      },
      {
        id: '4',
        userId: 'u4',
        trainingId: '21312-123123-124jdoa1',
        nama: 'Diana Prince',
        pekerjaan: 'Data Scientist',
        perusahaan: 'DataWorks',
        status: 'pending',
        tanggalDaftar: '2023-09-18',
        role: 'karyawan',
      },
      {
        id: '5',
        userId: 'u5',
        trainingId: '21312-123123-124jdoa1',
        nama: 'Ethan Hunt',
        pekerjaan: 'DevOps Engineer',
        perusahaan: 'Cloud Solutions',
        status: 'approved',
        tanggalDaftar: '2023-09-19',
        role: 'karyawan',
      },
    ],
    []
  )

  const [searchKeyword, setSearchKeyword] = useState('')
  const [filteredData, setFilteredData] = useState<Peserta[]>([])

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
      <DataTable columns={pesertaColumns} data={filteredData} />
    </div>
  )
}
