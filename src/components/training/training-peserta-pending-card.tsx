import { formatDate } from '@/lib/utils'
import PesertaRoleBadge from '../peserta/peserta-role-badge'
import TrainingPesertaApproveDialog from './training-peserta-approve-dialog'

export default function TrainingPesertaPendingCard({
  onUpdate,
  trainingId,
  peserta,
}: {
  onUpdate: () => void
  trainingId: string
  peserta: Attendee
}) {
  return (
    <div className="rounded-lg border border-primary/20 p-4 flex justify-between items-center">
      <div>
        <div className="flex items-center gap-1">
          <h2 className="font-semibold">{peserta.user.profile?.nama}</h2>
          <PesertaRoleBadge role={peserta.user.role?.name as 'employee' | 'trainee'} />
        </div>
        <p className="text-xs text-gray-500">
          {peserta.user.profile?.pekerjaan} ({peserta.user.profile?.perusahaan})
        </p>

        <div className="mt-2 text-xs">
          Tanggal Daftar: {formatDate(new Date(peserta.tgl_daftar))}
        </div>
      </div>
      <div>
        <TrainingPesertaApproveDialog trainingId={trainingId} peserta={peserta} onUpdate={onUpdate}/>
      </div>
    </div>
  )
}
