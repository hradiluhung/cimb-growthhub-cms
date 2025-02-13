'use client'

import { ColumnDef } from '@tanstack/react-table'
import PesertaRoleBadge from './peserta-role-badge'
import PesertaStatusBadge from './peserta-status-badge'
import { formatDate } from '@/lib/utils'
import PesertaActions from './peserta-actions'

export const pesertaColumns = (trainingId: string, onUpdate: () => void): ColumnDef<Attendee>[] => [
  {
    header: 'No',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'user.profile.nama',
    header: 'Nama',
  },
  {
    header: 'Pekerjaan',
    cell: (cell) => {
      const user = cell.row.original.user.profile

      return (
        <div>
          <p>{user?.pekerjaan}</p>
          <p className="text-gray-500 text-sm">{user?.perusahaan}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'user.role.name',
    header: 'Role',
    cell: ({ getValue }) => <PesertaRoleBadge role={getValue() as 'employee' | 'trainee'} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <PesertaStatusBadge status={getValue() as 'pending' | 'approved' | 'rejected'} />
    ),
  },
  {
    accessorKey: 'tgl_daftar',
    header: 'Tanggal Daftar',
    cell: ({ getValue }) => <span>{formatDate(new Date(getValue() as string))}</span>,
  },
  {
    header: 'Aksi',
    cell: (cell) => {
      const peserta = cell.row.original

      return <PesertaActions trainingId={trainingId} peserta={peserta} onUpdate={onUpdate} />
    },
  },
]
