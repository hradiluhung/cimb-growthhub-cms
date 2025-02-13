import React from 'react'
import TrainingPesertaApproveDialog from '../training/training-peserta-approve-dialog'
import { Button } from '../ui/button'
import { Eye } from 'lucide-react'
import Link from 'next/link'

export default function PesertaActions({ peserta }: { peserta: Peserta }) {
  return (
    <div className="flex items-center gap-1">
      <Button size="sm" asChild className="flex items-center gap-1">
        <Link href={`peserta/${peserta.id}`}>
          <Eye className="size-4" />
          <p>Detail</p>
        </Link>
      </Button>
      {peserta.status === 'pending' && <TrainingPesertaApproveDialog peserta={peserta} />}
    </div>
  )
}
