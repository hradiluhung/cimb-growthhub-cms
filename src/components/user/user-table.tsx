'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { userColumns } from './user-columns'
import { DataTable } from '../common/data-table'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import SearchBar from '../common/search-bar'

export default function UserTable() {
  const [searchKeyword, setSearchKeyword] = useState('')
  const [filteredData, setFilteredData] = useState<Profile[]>([])

  // TODO: fetch data from API
  const data: Profile[] = useMemo(
    () => [
      {
        id: '1',
        nama: 'John Doe',
        email: 'john.doe@example.com',
        userId: 'user1',
        tanggalLahir: '1990-01-01',
        pekerjaan: 'Software Engineer',
        perusahaan: 'Tech Corp',
        noTelp: '1234567890',
        role: 'karyawan',
      },
      {
        id: '3',
        nama: 'Alice Johnson',
        email: 'alice.johnson@example.com',
        userId: 'user3',
        tanggalLahir: '1992-07-20',
        pekerjaan: 'UX Designer',
        perusahaan: 'Design Studio',
        noTelp: '1122334455',
        role: 'karyawan',
      },
      {
        id: '4',
        nama: 'Bob Brown',
        email: 'bob.brown@example.com',
        userId: 'user4',
        tanggalLahir: '1988-03-30',
        pekerjaan: 'Data Scientist',
        perusahaan: 'Data Insights',
        noTelp: '2233445566',
        role: 'karyawan',
      },
      {
        id: '5',
        nama: 'Charlie Davis',
        email: 'charlie.davis@example.com',
        userId: 'user5',
        tanggalLahir: '1995-11-11',
        pekerjaan: 'Marketing Specialist',
        perusahaan: 'Market Leaders',
        noTelp: '3344556677',
        role: 'karyawan',
      },
      {
        id: '6',
        nama: 'Diana Evans',
        email: 'diana.evans@example.com',
        userId: 'user6',
        tanggalLahir: '1983-08-25',
        pekerjaan: 'HR Manager',
        perusahaan: 'People First',
        noTelp: '4455667788',
        role: 'hr',
      },
      {
        id: '7',
        nama: 'Ethan Foster',
        email: 'ethan.foster@example.com',
        userId: 'user7',
        tanggalLahir: '1991-12-05',
        pekerjaan: 'Financial Analyst',
        perusahaan: 'Finance Experts',
        noTelp: '5566778899',
        role: 'karyawan',
      },
      {
        id: '8',
        nama: 'Fiona Green',
        email: 'fiona.green@example.com',
        userId: 'user8',
        tanggalLahir: '1987-04-18',
        pekerjaan: 'Operations Manager',
        perusahaan: 'Efficient Ops',
        noTelp: '6677889900',
        role: 'karyawan',
      },
      {
        id: '9',
        nama: 'George Harris',
        email: 'george.harris@example.com',
        userId: 'user9',
        tanggalLahir: '1993-09-09',
        pekerjaan: 'Sales Executive',
        perusahaan: 'Sales Pros',
        noTelp: '7788990011',
        role: 'karyawan',
      },
      {
        id: '10',
        nama: 'Hannah White',
        email: 'hannah.white@example.com',
        userId: 'user10',
        tanggalLahir: '1989-06-22',
        pekerjaan: 'Customer Support',
        perusahaan: 'Support Hub',
        noTelp: '8899001122',
        role: 'trainee',
      },
    ],
    []
  )

  useEffect(() => {
    const filtered = data.filter((user) => {
      return Object.values(user).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchKeyword.toLowerCase())
        }
        return false
      })
    })
    setFilteredData(filtered)
  }, [data, searchKeyword])

  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder="Cari nama"
        />
      </div>
      <DataTable columns={userColumns} data={filteredData} />
    </div>
  )
}
