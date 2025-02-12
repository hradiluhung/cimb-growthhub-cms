'use client'
import React from 'react'
import { Button } from '../ui/button'
import { Edit2, Trash2 } from 'lucide-react'
import Link from 'next/link'

export default function UserActions({ user }: { user: Profile }) {
  const deleteHandler = async () => {
    // TODO: Implement delete user
    console.log(`Delete user ${user.nama}`)
  }

  return (
    <div className="flex items-center gap-1">
      <Button size="sm" variant="secondary" asChild>
        <Link href={`users/${user.id}`}>
          <Edit2 className="size-4" />
        </Link>
      </Button>
      <Button size="sm" variant="ghost" onClick={deleteHandler}>
        <Trash2 className="size-4 text-red-500" />
      </Button>
    </div>
  )
}
