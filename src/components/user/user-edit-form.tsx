'use client'
import React, { useEffect, useState } from 'react'
import UserForm from './user-form'
import { getUserById } from '@/lib/actions/users/get-user-by-id'
import { Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'

export default function UserEditForm({ id }: { id: string }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const user = await getUserById(id)
      setUser(user)
      setLoading(false)
    }
    fetchData()
  }, [id])

  if (!user && !loading) return notFound()

  return loading ? (
    <div className="flex items-center justify-center">
      <Loader2 className="animate-spin size-8 text-primary" />
    </div>
  ) : (
    user && <UserForm defaultValues={user} type="edit" />
  )
}
