'use client'
import { usePathname, useRouter } from 'next/navigation'
import Logo from './logo'
import Link from 'next/link'
import { BookText, Home, LogOut, User, Users } from 'lucide-react'
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
      name: 'Dashboard',
      icon: Home,
      link: '/hr',
    },
    {
      name: 'Trainings',
      icon: BookText,
      link: '/hr/trainings',
    },
  ],
}

export default function Sidebar() {
  const router = useRouter()
  const pathName = usePathname()
  // TODO: Get user role from context
  const role: 'admin' | 'hr' = pathName.includes('admin') ? 'admin' : 'hr'

  const onLogout = () => {
    // TODO: Implement logout
    router.push('/')
  }

  return (
    <div className="p-2">
      <div className="h-full bg-primary w-64 rounded-3xl p-4 flex flex-col gap-8">
        <div className="flex flex-col gap-2 border-b border-white/20 pb-4">
          <Logo size="md" invert />
          <div className="flex items-center gap-1 text-white/60">
            <User className="size-5 " />
            {/* TODO: Render dynamic user role */}
            <p className="font-semibold text-sm">
              {(role as 'admin' | 'hr') === 'hr' ? 'Human Resource' : 'Admin'}
            </p>
          </div>
        </div>
        <NavItems role={role} />

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

function NavItems({ role }: { role: 'admin' | 'hr' }) {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-2">
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
