'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { userColumns } from './user-columns'
import { DataTable } from '../common/data-table'
import { Input } from '../ui/input'
import { Search } from 'lucide-react'
import SearchBar from '../common/search-bar'
import { getAllUsers } from '@/lib/actions/users/get-all-users'
import { useToast } from '@/hooks/use-toast'

export default function UserTable() {
  const { toast } = useToast()
  const [searchKeyword, setSearchKeyword] = useState('')
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const users = await getAllUsers()
        const filteredUsers = users.filter((user) => user.role.name !== 'admin')

        setUsers(filteredUsers)
        setFilteredUsers(filteredUsers)
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
    const filtered = users.filter((user) => {
      return Object.values(user).some((value) => {
        if (typeof value === 'string') {
          return value.toLowerCase().includes(searchKeyword.toLowerCase())
        }
        return false
      })
    })
    setFilteredUsers(filtered)
  }, [searchKeyword, users])

  return (
    <div className="flex flex-col gap-4 ">
      <div>
        <SearchBar
          searchKeyword={searchKeyword}
          setSearchKeyword={setSearchKeyword}
          placeholder="Cari nama"
        />
      </div>
      {loading ? (
        <DataTable.Skeleton columns={userColumns} rows={10} />
      ) : (
        <DataTable columns={userColumns} data={filteredUsers} />
      )}
    </div>
  )
}
