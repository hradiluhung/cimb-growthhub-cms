import { formatDate } from '@/lib/utils'
import { Loader2, MousePointerClick } from 'lucide-react'
import PesertaStatusBadge from '../peserta/peserta-status-badge'
import { Button } from '../ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { useState } from 'react'
import { approvePeserta } from '@/lib/actions/peserta/approve-peserta'
import { useToast } from '@/hooks/use-toast'
import { rejectPeserta } from '@/lib/actions/peserta/reject-peserta'

export default function TrainingPesertaApproveDialog({
  onUpdate,
  trainingId,
  peserta,
}: {
  onUpdate: () => void
  trainingId: string
  peserta: Attendee
}) {
  const { toast } = useToast()
  const [loadingApprove, setLoadingApprove] = useState(false)
  const [loadingReject, setLoadingReject] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)

  async function onApprove() {
    try {
      setLoadingApprove(true)
      const { success, message } = await approvePeserta(trainingId, peserta.id)

      if (success) {
        toast({
          title: 'Berhasil',
          description: message,
        })
        setOpenDialog(false)
        onUpdate()
      } else {
        throw new Error(message)
      }
    } catch (error: any) {
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoadingApprove(false)
    }
  }

  async function onReject() {
    try {
      setLoadingReject(true)
      const { success, message } = await rejectPeserta(trainingId, peserta.id)

      if (success) {
        toast({
          title: 'Berhasil',
          description: message,
        })
        setOpenDialog(false)
        onUpdate()
      } else {
        throw new Error(message)
      }
    } catch (error: any) {
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoadingReject(false)
    }
  }

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 items-center">
          <MousePointerClick className="size-5" />
          Setujui/Tolak
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Attendee</DialogTitle>
          <DialogDescription>Anda dapat menyetujui atau menolak pendaftar ini</DialogDescription>

          <div>
            <div className="mb-4 grid grid-cols-2 gap-4 mt-8">
              <p className="text-sm font-semibold">Nama:</p>
              <p className="text-sm">{peserta.user.profile?.nama}</p>
              <p className="text-sm font-semibold">Pekerjaan:</p>
              <p className="text-sm">{peserta.user.profile?.pekerjaan}</p>
              <p className="text-sm font-semibold">Perusahaan:</p>
              <p className="text-sm">{peserta.user.profile?.perusahaan}</p>
              <p className="text-sm font-semibold">Role:</p>
              <p className="text-sm">
                {peserta.user.role.name === 'employee' ? 'Karyawan' : 'Non-karyawan'}
              </p>
              <p className="text-sm font-semibold">Status:</p>
              <div>
                <PesertaStatusBadge status={peserta.status} />
              </div>
              <p className="text-sm font-semibold">Tanggal Daftar:</p>
              <p className="text-sm">{formatDate(new Date(peserta.tgl_daftar))}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-8">
              <Button
                variant="outline"
                size="sm"
                disabled={loadingReject}
                className="flex items-center gap-1"
                onClick={onReject}
              >
                {loadingReject && <Loader2 className="animate-spin size-5" />}
                Tolak
              </Button>
              <Button
                size="sm"
                disabled={loadingApprove}
                className="flex items-center gap-1"
                onClick={onApprove}
              >
                {loadingApprove && <Loader2 className="animate-spin size-5" />}Setujui
              </Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
