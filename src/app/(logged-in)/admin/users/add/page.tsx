import BackButton from '@/components/common/back-button'
import UserForm from '@/components/users/user-form'

export default function AddUserPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-2">
        <BackButton />
        <div>
          <h1 className="font-bold text-2xl text-primary">Tambah User</h1>
          <p>Tambahkan user baru untuk mendapatkan akses ke aplikasi.</p>
        </div>
      </div>
      <UserForm />
    </div>
  )
}
