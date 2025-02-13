import React from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { EyeIcon, Trash2 } from 'lucide-react'

export default function TrainingActions({ training }: { training: Training }) {
  const deleteHandler = async () => {
    // TODO: Implement delete training
    console.log(`Delete training ${training.nama}`)
  }

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="secondary" asChild>
        <Link href={`trainings/${training.id}`}>
          <EyeIcon className="size-4" />
        </Link>
      </Button>
      <Button size="sm" variant="ghost" onClick={deleteHandler}>
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </div>
  )
}
