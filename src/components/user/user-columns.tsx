'use client'
import { ColumnDef } from '@tanstack/react-table'
import UserRoleBadge from './user-role-badge'
import UserActions from './user-actions'

export const userColumns: ColumnDef<User>[] = [
  {
    header: 'No',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
    cell: (cell) => {
      const user = cell.row.original
      return (
        <div>
          <p>{user.profile?.nama}</p>
          <p className="text-gray-500 text-sm">{user.profile?.email}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'pekerjaan',
    header: 'Pekerjaan',
    cell: (cell) => {
      const user = cell.row.original
      return (
        <div>
          <p>{user.profile?.pekerjaan}</p>
          <p className="text-gray-500 text-sm">{user.profile?.perusahaan}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'profile.no_telepon',
    header: 'No. Telp',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => (
      <UserRoleBadge role={(getValue() as Role).name as 'hr' | 'employee' | 'trainee'} />
    ),
  },
  {
    header: 'Aksi',
    cell: (cell) => {
      const user = cell.row.original

      return <UserActions user={user} />
    },
  },
]
