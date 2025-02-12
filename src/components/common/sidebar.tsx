'use client'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './logo'
import Link from 'next/link'
import { BookText, Home, LogOut, Users } from 'lucide-react'
import { Button } from '../ui/button'

const navItems = {
  admin: [
    {
      name: 'Dashboard',
      icon: Home,
      link: '/admin',
    },
    {
      name: 'Users',
      icon: Users,
      link: '/admin/users',
    },
    {
      name: 'Trainings',
      icon: BookText,
      link: '/admin/trainings',
    },
  ],
  hr: [
    {
      name: 'Trainings',
      icon: BookText,
      link: '/hr/trainings',
    },
  ],
}

export default function Sidebar() {
  const router = useRouter()
  // TODO: Get user role from context
  const role = 'admin'

  const onLogout = () => {
    // TODO: Implement logout
    router.push('/')
  }

  return (
    <div className="p-2">
      <div className="h-full bg-primary w-64 rounded-3xl p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Logo size="md" invert />
          <p className="text-white font-semibold">
            {role === 'admin' ? 'Admin' : role === 'hr' ? 'HR' : null}
          </p>
        </div>
        <NavItems />

        <div className="mt-auto">
          <Button
            variant="outline"
            onClick={onLogout}
            className="w-full bg-white/10 text-white hover:bg-white/20 hover:text-white"
          >
            <LogOut className="size-5" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  )
}

function NavItems() {
  const pathname = usePathname()
  const role = 'admin'

  return (
    <nav className="mt-8 flex flex-col gap-2">
      {navItems[role].map((item, index) => (
        <Link
          key={index}
          href={item.link}
          className={`flex items-center justify-start gap-2 p-2 rounded-lg ${
            pathname === item.link ? 'bg-white/70 text-primary font-semibold' : 'text-white'
          }`}
        >
          <item.icon className="size-5" />
          <span>{item.name}</span>
        </Link>
      ))}
    </nav>
  )
}
