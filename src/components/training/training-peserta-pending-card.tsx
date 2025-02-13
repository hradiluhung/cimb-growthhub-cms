import { formatDate } from '@/lib/utils'
import PesertaRoleBadge from '../peserta/peserta-role-badge'
import TrainingPesertaApproveDialog from './training-peserta-approve-dialog'

export default function TrainingPesertaPendingCard({ peserta }: { peserta: Peserta }) {
  return (
    <div className="rounded-lg border border-primary/20 p-4 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-1">
          <h2 className="font-semibold">{peserta.nama}</h2>
          <PesertaRoleBadge role={peserta.role} />
        </div>
        <p className="text-xs text-gray-500">
          {peserta.pekerjaan} ({peserta.perusahaan})
        </p>

        <div className="mt-2 text-xs">
          Tanggal Daftar: {formatDate(new Date(peserta.tanggalDaftar))}
        </div>
      </div>
      <div>
        <TrainingPesertaApproveDialog peserta={peserta} />
      </div>
    </div>
  )
}
