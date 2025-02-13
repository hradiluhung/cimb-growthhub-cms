import BackButton from '@/components/common/back-button'
import UserEditForm from '@/components/user/user-edit-form'
import UserForm from '@/components/user/user-form'
import React from 'react'

export default async function EditUserPage({ params }: { params: Promise<{ id: string }> }) {
  const id = (await params).id

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <BackButton />
        <div>
          <h1 className="font-bold text-2xl text-primary">Edit User</h1>
          <p>Edit user untuk mengubah data user.</p>
        </div>
      </div>
      <div className="md:px-8 lg:px-12">
        <UserEditForm id={id} />
      </div>
    </div>
  )
}
