import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { ArrowRight } from 'lucide-react'
import PesertaTable from '../peserta/peserta-table'

export default function TrainingPesertaListDialog({
  onUpdate,
  trainingId,
  peserta,
}: {
  onUpdate: () => void
  trainingId: string
  peserta: Attendee[]
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="rounded-lg bg-primary/20 p-4 flex justify-between items-center group cursor-pointer">
          <h1 className="font-semibold text-primary text-lg flex gap-2 items-center">
            <span className="flex items-center justify-center rounded-full bg-primary text-white  size-8">
              {peserta.length}{' '}
            </span>
            Attendee Telah Mendaftar
          </h1>
          <ArrowRight className="text-primary transition-transform transform group-hover:translate-x-2" />
        </div>
      </DialogTrigger>
      <DialogContent className="min-w-full h-screen">
        <DialogHeader>
          <DialogTitle>Daftar Attendee Training</DialogTitle>
          <DialogDescription>
            Semua peserta yang telah mendaftar pada training ini.
          </DialogDescription>

          <div className="overflow-y-scroll p-1 h-[calc(100%-4rem)]">
            <PesertaTable trainingId={trainingId} peserta={peserta} onUpdate={onUpdate}/>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
