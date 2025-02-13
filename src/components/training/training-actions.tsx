'use client'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import Link from 'next/link'
import { EyeIcon, Loader2, Trash2 } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { deleteTraining } from '@/lib/actions/training/delete-training'
import { useSession } from 'next-auth/react'

export default function TrainingActions({
  training,
  onDeleted,
}: {
  training: Training
  onDeleted?: (id: string) => void
}) {
  const { data } = useSession()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const deleteHandler = async () => {
    try {
      setLoading(true)
      const { success, message } = await deleteTraining(training.id)

      if (success) {
        toast({
          title: 'Berhasil menghapus',
          description: message,
        })

        if (onDeleted) {
          onDeleted(training.id)
        }
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
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="secondary" asChild>
        <Link href={`trainings/${training.id}`}>
          <EyeIcon className="size-4" />
        </Link>
      </Button>
      {data?.user.role === 'hr' && (
        <Button
          type="submit"
          disabled={loading}
          size="sm"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={deleteHandler}
        >
          {loading ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            <Trash2 className="size-4 text-primary" />
          )}
        </Button>
      )}
    </div>
  )
}
