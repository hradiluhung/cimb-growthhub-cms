import React from 'react'
import TrainingPesertaApproveDialog from '../training/training-peserta-approve-dialog'
import { Button } from '../ui/button'
import { Eye } from 'lucide-react'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

export default function PesertaActions({
  onUpdate,
  trainingId,
  peserta,
}: {
  onUpdate: () => void
  trainingId: string
  peserta: Attendee
}) {
  const { data } = useSession()

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" asChild className="flex items-center gap-1">
        <Link href={`${data?.user.role === 'admin' ? '/admin/' : ''}peserta/${peserta.user_id}`}>
          <Eye className="size-4" />
          <p>Detail</p>
        </Link>
      </Button>
      {data?.user.role === 'hr' && peserta.status === 'pending' && (
        <TrainingPesertaApproveDialog
          trainingId={trainingId}
          peserta={peserta}
          onUpdate={onUpdate}
        />
      )}
    </div>
  )
}
