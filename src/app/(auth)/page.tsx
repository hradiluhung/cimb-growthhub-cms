import LoginForm from '@/components/auth/login-form'
import Logo from '@/components/common/logo'
import { authOptions } from '@/lib/auth/auth-options'
import { getSessionRole } from '@/lib/auth/session'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const role = await getSessionRole()

  if (role === 'admin') {
    redirect('/admin')
  } else if (role === 'hr') {
    redirect('/hr')
  }

  return (
    <div className="flex items-center justify-center h-screen w-screen">
      <div className="h-full hidden md:block md:w-1/2 lg:w-1/3 relative">
        <img
          src="/training.webp"
          alt="Logo"
          width={100}
          height={100}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-red-500 opacity-40"></div>
      </div>
      <div className="h-full flex-1 py-24 px-8 md:px-16 lg:px-64 flex flex-col gap-8 md:flex md:justify-center">
        <Logo />
        <LoginForm />
      </div>
    </div>
  )
}
