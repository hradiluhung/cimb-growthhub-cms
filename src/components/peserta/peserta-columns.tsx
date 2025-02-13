'use client'

import { ColumnDef } from '@tanstack/react-table'
import PesertaRoleBadge from './peserta-role-badge'
import PesertaStatusBadge from './peserta-status-badge'
import { formatDate } from '@/lib/utils'
import PesertaActions from './peserta-actions'

export const pesertaColumns: ColumnDef<Peserta>[] = [
  {
    header: 'No',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'pekerjaan',
    header: 'Pekerjaan',
    cell: (cell) => {
      const user = cell.row.original
      return (
        <div>
          <p>{user.pekerjaan}</p>
          <p className="text-gray-500 text-sm">{user.perusahaan}</p>
        </div>
      )
    },
  },
  {
    accessorKey: 'role',
    header: 'Role',
    cell: ({ getValue }) => <PesertaRoleBadge role={getValue() as 'karyawan' | 'trainee'} />,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ getValue }) => (
      <PesertaStatusBadge status={getValue() as 'pending' | 'approved' | 'rejected'} />
    ),
  },
  {
    accessorKey: 'tanggalDaftar',
    header: 'Tanggal Daftar',
    cell: ({ getValue }) => <span>{formatDate(new Date(getValue() as string))}</span>,
  },
  {
    header: 'Aksi',
    cell: (cell) => {
      const peserta = cell.row.original

      return <PesertaActions peserta={peserta} />
    },
  },
]
