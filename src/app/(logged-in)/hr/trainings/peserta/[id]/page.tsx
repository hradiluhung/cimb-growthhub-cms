import BackButton from '@/components/common/back-button'
import PesertaRoleBadge from '@/components/peserta/peserta-role-badge'
import PesertaStatusBadge from '@/components/peserta/peserta-status-badge'
import { formatDate } from '@/lib/utils'
import React from 'react'

export default async function DetailPesertaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id

  // TODO: fetch real data
  const peserta: Peserta = {
    id: '1',
    userId: 'u1',
    trainingId: id,
    nama: 'Alice Johnson',
    pekerjaan: 'Software Engineer',
    perusahaan: 'Tech Corp',
    status: 'approved',
    tanggalDaftar: '2023-09-15',
    role: 'karyawan',
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <BackButton />
        <div>
          <p>Detail Peserta</p>
          <h1 className="font-bold text-2xl text-primary">{peserta.nama}</h1>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-sm text-gray-500">Pekerjaan</p>
            <p className="text-lg">{peserta.pekerjaan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Perusahaan</p>
            <p className="text-lg">{peserta.perusahaan}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Status</p>
            <div>
              <PesertaStatusBadge status={peserta.status} />
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Tanggal Daftar</p>
            <p className="text-lg">{formatDate(new Date(peserta.tanggalDaftar))}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Role</p>
            <div>
              <PesertaRoleBadge role={peserta.role} />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <img src="/hr.png" alt="HR" className="w-72 object-cover rounded-full" />
        </div>
      </div>
    </div>
  )
}
