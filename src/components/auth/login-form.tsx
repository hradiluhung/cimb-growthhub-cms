'use client'
import { useToast } from '@/hooks/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const loginSchema = z.object({
  username: z.string().nonempty({
    message: 'Username harus diisi',
  }),
  password: z.string().nonempty({ message: 'Password harus diisi' }),
})

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      setLoading(true)
      const { username, password } = values

      const response = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (response?.ok) {
        router.refresh()
        toast({
          title: 'Berhasil login',
          description: 'Selamat datang di aplikasi',
        })
      } else {
        toast({
          title: 'Gagal login',
          description: 'Username atau password salah',
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      toast({
        title: 'Gagal login',
        description: error.message,
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-bold text-primary text-3xl">Login CMS</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan username terdaftar" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Masukkan password Anda" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={loading} className="flex items-center gap-1">
            {loading && <Loader2 className="animate-spin size-5" />}
            Login
          </Button>
        </form>
      </Form>
    </div>
  )
}
