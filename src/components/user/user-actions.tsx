'use client'
import { useToast } from '@/hooks/use-toast'
import { deleteUser } from '@/lib/actions/users/delete-user'
import { Edit2, Loader2, Trash2 } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { Button } from '../ui/button'

export default function UserActions({
  user,
  onDeleted,
}: {
  user: User
  onDeleted?: (id: string) => void
}) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const deleteHandler = async () => {
    try {
      setLoading(true)
      const { success, message } = await deleteUser(user.id)

      if (success) {
        toast({
          title: 'Berhasil menghapus',
          description: message,
        })

        if (onDeleted) {
          onDeleted(user.id)
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
        <Link href={`users/edit/${user.id}`}>
          <Edit2 className="size-4" />
        </Link>
      </Button>
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
    </div>
  )
}
