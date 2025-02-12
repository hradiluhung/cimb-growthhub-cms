'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
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
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/actions/auth/login'
import { useToast } from '@/hooks/use-toast'

const loginSchema = z.object({
  username: z.string().nonempty({
    message: 'Username harus diisi',
  }),
  password: z.string().nonempty({ message: 'Password harus diisi' }),
})

export default function LoginForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      const { username, password } = values

      // TOOD: Implement login
      const response = await login(username, password)

      toast({
        title: 'Berhasil login',
        description: 'Selamat datang di aplikasi',
      })

      if (response.role === 'admin') {
        router.push('/admin')
      } else {
        router.push('/hr')
      }
    } catch (error: any) {
      toast({
        title: 'Gagal login',
        description: error.message,
        variant: 'destructive',
      })
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
          <Button type="submit">Login</Button>
        </form>
      </Form>
    </div>
  )
}
