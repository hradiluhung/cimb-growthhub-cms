'use client'

import { formatDate } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'
import TrainingStatusBadge from './training-status-badge'
import TrainingTypeBadge from './training-type-badge'
import TrainingActions from './training-actions'

export const trainingColumns: ColumnDef<Training>[] = [
  {
    header: 'No',
    cell: (info) => info.row.index + 1,
  },
  {
    accessorKey: 'nama',
    header: 'Nama',
  },
  {
    accessorKey: 'nama_trainer',
    header: 'Trainer',
  },
  {
    accessorKey: 'kapasitas',
    header: 'Kapasitas',
  },
  {
    accessorKey: 'tanggal',
    header: 'Tanggal',
    cell: ({ getValue }) => formatDate(new Date(getValue() as string)),
  },
  {
    accessorKey: 'durasi',
    header: 'Durasi',
    cell: ({ getValue }) => `${getValue()} menit`,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => {
      const status = info.row.original.status
      return <TrainingStatusBadge status={status} />
    },
  },
  {
    accessorKey: 'tipe',
    header: 'Tipe',
    cell: (info) => {
      const tipe = info.row.original.tipe
      return <TrainingTypeBadge type={tipe} />
    },
  },

  {
    header: 'Aksi',
    cell: (cell) => {
      const training = cell.row.original
      return <TrainingActions training={training} />
    },
  },
]
