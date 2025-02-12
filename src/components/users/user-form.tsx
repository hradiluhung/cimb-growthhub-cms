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

const userSchema = z.object({
  nama: z.string().nonempty({
    message: 'Nama tidak boleh kosong',
  }),
  tanggalLahir: z.date({
    required_error: 'Tanggal lahir tidak boleh kosong',
  }),
  pekerjaan: z.string().nonempty({
    message: 'Pekerjaan tidak boleh kosong',
  }),
  perusahaan: z.string().nonempty({
    message: 'Perusahaan tidak boleh kosong',
  }),
  noTelp: z
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
  username: z.string().nonempty({
    message: 'Username harus diisi',
  }),
  role: z
    .enum(['hr', 'karyawan', 'trainee'], {
      required_error: 'Role tidak boleh kosong',
    })
    .refine((val) => val !== undefined, {
      message: 'Role tidak boleh kosong',
    }),
})

export default function UserForm() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      nama: '',
      tanggalLahir: undefined,
      pekerjaan: '',
      perusahaan: '',
      noTelp: '',
      email: '',
      username: '',
      role: undefined,
    },
  })

  const roleOptions = [
    { label: 'HR', value: 'hr' },
    { label: 'Karyawan', value: 'karyawan' },
    { label: 'Trainee', value: 'trainee' },
  ]

  async function onSubmit(values: z.infer<typeof userSchema>) {
    try {
      const { nama, tanggalLahir, pekerjaan, perusahaan, noTelp, email, username, role } = values

      const message = await createUser({
        nama,
        tanggalLahir,
        pekerjaan,
        perusahaan,
        noTelp,
        email,
        username,
        role,
      })

      toast({
        title: 'Berhasil',
        description: message,
      })

      router.push('/admin/users')
    } catch (error: any) {
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="md:px-8 lg:px-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              name="tanggalLahir"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Lahir</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={'outline'}
                          className={cn(
                            ' pl-3 text-left font-normal',
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
              name="noTelp"
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
              name="role"
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
    </div>
  )
}
