import { formatDate } from '@/lib/utils'
import { MousePointerClick } from 'lucide-react'
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

export default function TrainingPesertaApproveDialog({ peserta }: { peserta: Peserta }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="flex gap-2 items-center">
          <MousePointerClick className="size-5" />
          Setujui/Tolak
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Detail Peserta</DialogTitle>
          <DialogDescription>Anda dapat menyetujui atau menolak pendaftar ini</DialogDescription>

          <div>
            <div className="mb-4 grid grid-cols-2 gap-4 mt-8">
              <p className="text-sm font-semibold">Nama:</p>
              <p className="text-sm">{peserta.nama}</p>
              <p className="text-sm font-semibold">Pekerjaan:</p>
              <p className="text-sm">{peserta.pekerjaan}</p>
              <p className="text-sm font-semibold">Perusahaan:</p>
              <p className="text-sm">{peserta.perusahaan}</p>
              <p className="text-sm font-semibold">Role:</p>
              <p className="text-sm">{peserta.role === 'karyawan' ? 'Karyawan' : 'Non-karyawan'}</p>
              <p className="text-sm font-semibold">Status:</p>
              <div>
                <PesertaStatusBadge status={peserta.status} />
              </div>
              <p className="text-sm font-semibold">Tanggal Daftar:</p>
              <p className="text-sm">{formatDate(new Date(peserta.tanggalDaftar))}</p>
            </div>
            <div className="flex justify-end space-x-2 mt-8">
              <DialogClose asChild>
                <Button variant="outline" size="sm">
                  Tolak
                </Button>
              </DialogClose>
              <Button size="sm">Setujui</Button>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
