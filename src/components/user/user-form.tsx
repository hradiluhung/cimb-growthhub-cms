'use client'
import { useToast } from '@/hooks/use-toast'
import createUser from '@/lib/actions/users/create-user'
import { cn, formatDate } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '../ui/button'
import { Calendar } from '../ui/calendar'
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
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { useEffect, useState } from 'react'
import { getAllRoles } from '@/lib/actions/users/role/get-all-roles'

const userSchema = z.object({
  username: z.string().nonempty({
    message: 'Username harus diisi',
  }),
  password: z.string().nonempty({ message: 'Password harus diisi' }),
  nama: z.string().nonempty({
    message: 'Nama tidak boleh kosong',
  }),
  tgl_lahir: z.date({
    required_error: 'Tanggal lahir tidak boleh kosong',
  }),
  pekerjaan: z.string().nonempty({
    message: 'Pekerjaan tidak boleh kosong',
  }),
  perusahaan: z.string().nonempty({
    message: 'Perusahaan tidak boleh kosong',
  }),
  no_telepon: z
    .string()
    .nonempty({
      message: 'Nomor telepon tidak boleh kosong',
    })
    .refine((val) => /^\d+$/.test(val), {
      message: 'Nomor telepon hanya boleh berisi angka',
    }),
  email: z.string().email({
    message: 'Email tidak valid',
  }),
  role_id: z
    .string({
      required_error: 'Role tidak boleh kosong',
    })
    .nonempty({
      message: 'Role tidak boleh kosong',
    }),
})

export default function UserForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: '',
      password: '',
      nama: '',
      tgl_lahir: undefined,
      pekerjaan: '',
      perusahaan: '',
      no_telepon: '',
      email: '',
      role_id: undefined,
    },
  })
  const [roles, setRoles] = useState<Role[]>([])

  const roleOptions = roles.map((role) => ({
    label:
      role.name.toLowerCase() === 'hr'
        ? 'HR'
        : role.name.charAt(0).toUpperCase() + role.name.slice(1).toLowerCase(),
    value: role.id,
  }))

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      const { nama, tgl_lahir, pekerjaan, perusahaan, no_telepon, email, username, role_id, password } =
        values

      console.log('values', values)

      const { success, message } = await createUser({
        nama,
        password,
        tgl_lahir,
        pekerjaan,
        perusahaan,
        no_telepon,
        email,
        username,
        role_id,
      })

      if (success) {
        toast({
          title: 'Berhasil',
          description: message,
        })

        router.push('/admin/users')
      } else {
        throw new Error(message)
      }
    } catch (error: any) {
      console.log(error.message)
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllRoles()
        const filteredData = data.filter((role) => role.name !== 'admin')

        setRoles(filteredData)
      } catch (error: any) {
        toast({
          title: 'Gagal mengambil data',
          description: error.message,
          variant: 'destructive',
        })
      }
    }

    fetchData()
  }, [toast])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan username" {...field} />
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
                  <Input type="password" placeholder="Masukkan password" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tgl_lahir"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="inline">Tanggal Lahir</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          ' pl-3 text-left font-normal mt-4 w-full',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        {field.value ? formatDate(field.value) : <span>Pilih tanggal</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      captionLayout="dropdown-buttons"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      fromYear={1960}
                      toYear={2030}
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pekerjaan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pekerjaan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan pekerjaan" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="perusahaan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perusahaan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan perusahaan" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="no_telepon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nomor Telepon</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nomor telepon" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Masukkan email" {...field} />
                </FormControl>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="role_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roleOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button type="button" onClick={() => form.reset()} variant="secondary">
            Reset
          </Button>
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  )
}
